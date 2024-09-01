package com.demo.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.demo.IntegrationTest;
import com.demo.domain.Expertise;
import com.demo.repository.ExpertiseRepository;
import com.demo.repository.search.ExpertiseSearchRepository;
import com.demo.service.dto.ExpertiseDTO;
import com.demo.service.mapper.ExpertiseMapper;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.apache.commons.collections4.IterableUtils;
import org.assertj.core.util.IterableUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ExpertiseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ExpertiseResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 20;
    private static final Integer UPDATED_LEVEL = 21;

    private static final String ENTITY_API_URL = "/api/expertise";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/expertise";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ExpertiseRepository expertiseRepository;

    @Autowired
    private ExpertiseMapper expertiseMapper;

    @Autowired
    private ExpertiseSearchRepository expertiseSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExpertiseMockMvc;

    private Expertise expertise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expertise createEntity(EntityManager em) {
        Expertise expertise = new Expertise().title(DEFAULT_TITLE).description(DEFAULT_DESCRIPTION).level(DEFAULT_LEVEL);
        return expertise;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expertise createUpdatedEntity(EntityManager em) {
        Expertise expertise = new Expertise().title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).level(UPDATED_LEVEL);
        return expertise;
    }

    @AfterEach
    public void cleanupElasticSearchRepository() {
        expertiseSearchRepository.deleteAll();
        assertThat(expertiseSearchRepository.count()).isEqualTo(0);
    }

    @BeforeEach
    public void initTest() {
        expertise = createEntity(em);
    }

    @Test
    @Transactional
    void createExpertise() throws Exception {
        int databaseSizeBeforeCreate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);
        restExpertiseMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isCreated());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        Expertise testExpertise = expertiseList.get(expertiseList.size() - 1);
        assertThat(testExpertise.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testExpertise.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testExpertise.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    void createExpertiseWithExistingId() throws Exception {
        // Create the Expertise with an existing ID
        expertise.setId(1L);
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        int databaseSizeBeforeCreate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpertiseMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        // set the field null
        expertise.setTitle(null);

        // Create the Expertise, which fails.
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        restExpertiseMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isBadRequest());

        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeTest);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllExpertise() throws Exception {
        // Initialize the database
        expertiseRepository.saveAndFlush(expertise);

        // Get all the expertiseList
        restExpertiseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expertise.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }

    @Test
    @Transactional
    void getExpertise() throws Exception {
        // Initialize the database
        expertiseRepository.saveAndFlush(expertise);

        // Get the expertise
        restExpertiseMockMvc
            .perform(get(ENTITY_API_URL_ID, expertise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(expertise.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL));
    }

    @Test
    @Transactional
    void getNonExistingExpertise() throws Exception {
        // Get the expertise
        restExpertiseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingExpertise() throws Exception {
        // Initialize the database
        expertiseRepository.saveAndFlush(expertise);

        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        expertiseSearchRepository.save(expertise);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());

        // Update the expertise
        Expertise updatedExpertise = expertiseRepository.findById(expertise.getId()).get();
        // Disconnect from session so that the updates on updatedExpertise are not directly saved in db
        em.detach(updatedExpertise);
        updatedExpertise.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).level(UPDATED_LEVEL);
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(updatedExpertise);

        restExpertiseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, expertiseDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isOk());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        Expertise testExpertise = expertiseList.get(expertiseList.size() - 1);
        assertThat(testExpertise.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testExpertise.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testExpertise.getLevel()).isEqualTo(UPDATED_LEVEL);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<Expertise> expertiseSearchList = IterableUtils.toList(expertiseSearchRepository.findAll());
                Expertise testExpertiseSearch = expertiseSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testExpertiseSearch.getTitle()).isEqualTo(UPDATED_TITLE);
                assertThat(testExpertiseSearch.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
                assertThat(testExpertiseSearch.getLevel()).isEqualTo(UPDATED_LEVEL);
            });
    }

    @Test
    @Transactional
    void putNonExistingExpertise() throws Exception {
        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        expertise.setId(count.incrementAndGet());

        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpertiseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, expertiseDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchExpertise() throws Exception {
        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        expertise.setId(count.incrementAndGet());

        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExpertiseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamExpertise() throws Exception {
        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        expertise.setId(count.incrementAndGet());

        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExpertiseMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateExpertiseWithPatch() throws Exception {
        // Initialize the database
        expertiseRepository.saveAndFlush(expertise);

        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();

        // Update the expertise using partial update
        Expertise partialUpdatedExpertise = new Expertise();
        partialUpdatedExpertise.setId(expertise.getId());

        partialUpdatedExpertise.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);

        restExpertiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExpertise.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExpertise))
            )
            .andExpect(status().isOk());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        Expertise testExpertise = expertiseList.get(expertiseList.size() - 1);
        assertThat(testExpertise.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testExpertise.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testExpertise.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    void fullUpdateExpertiseWithPatch() throws Exception {
        // Initialize the database
        expertiseRepository.saveAndFlush(expertise);

        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();

        // Update the expertise using partial update
        Expertise partialUpdatedExpertise = new Expertise();
        partialUpdatedExpertise.setId(expertise.getId());

        partialUpdatedExpertise.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).level(UPDATED_LEVEL);

        restExpertiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExpertise.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedExpertise))
            )
            .andExpect(status().isOk());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        Expertise testExpertise = expertiseList.get(expertiseList.size() - 1);
        assertThat(testExpertise.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testExpertise.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testExpertise.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    void patchNonExistingExpertise() throws Exception {
        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        expertise.setId(count.incrementAndGet());

        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpertiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, expertiseDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchExpertise() throws Exception {
        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        expertise.setId(count.incrementAndGet());

        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExpertiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamExpertise() throws Exception {
        int databaseSizeBeforeUpdate = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        expertise.setId(count.incrementAndGet());

        // Create the Expertise
        ExpertiseDTO expertiseDTO = expertiseMapper.toDto(expertise);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExpertiseMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(expertiseDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Expertise in the database
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteExpertise() throws Exception {
        // Initialize the database
        expertiseRepository.saveAndFlush(expertise);
        expertiseRepository.save(expertise);
        expertiseSearchRepository.save(expertise);

        int databaseSizeBeforeDelete = expertiseRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the expertise
        restExpertiseMockMvc
            .perform(delete(ENTITY_API_URL_ID, expertise.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expertise> expertiseList = expertiseRepository.findAll();
        assertThat(expertiseList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(expertiseSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchExpertise() throws Exception {
        // Initialize the database
        expertise = expertiseRepository.saveAndFlush(expertise);
        expertiseSearchRepository.save(expertise);

        // Search the expertise
        restExpertiseMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + expertise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expertise.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }
}
