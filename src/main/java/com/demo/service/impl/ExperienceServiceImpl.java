package com.demo.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.demo.domain.Experience;
import com.demo.repository.ExperienceRepository;
import com.demo.repository.search.ExperienceSearchRepository;
import com.demo.service.ExperienceService;
import com.demo.service.dto.ExperienceDTO;
import com.demo.service.mapper.ExperienceMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Experience}.
 */
@Service
@Transactional
public class ExperienceServiceImpl implements ExperienceService {

    private final Logger log = LoggerFactory.getLogger(ExperienceServiceImpl.class);

    private final ExperienceRepository experienceRepository;

    private final ExperienceMapper experienceMapper;

    private final ExperienceSearchRepository experienceSearchRepository;

    public ExperienceServiceImpl(
        ExperienceRepository experienceRepository,
        ExperienceMapper experienceMapper,
        ExperienceSearchRepository experienceSearchRepository
    ) {
        this.experienceRepository = experienceRepository;
        this.experienceMapper = experienceMapper;
        this.experienceSearchRepository = experienceSearchRepository;
    }

    @Override
    public ExperienceDTO save(ExperienceDTO experienceDTO) {
        log.debug("Request to save Experience : {}", experienceDTO);
        Experience experience = experienceMapper.toEntity(experienceDTO);
        experience = experienceRepository.save(experience);
        ExperienceDTO result = experienceMapper.toDto(experience);
        experienceSearchRepository.index(experience);
        return result;
    }

    @Override
    public ExperienceDTO update(ExperienceDTO experienceDTO) {
        log.debug("Request to update Experience : {}", experienceDTO);
        Experience experience = experienceMapper.toEntity(experienceDTO);
        experience = experienceRepository.save(experience);
        ExperienceDTO result = experienceMapper.toDto(experience);
        experienceSearchRepository.index(experience);
        return result;
    }

    @Override
    public Optional<ExperienceDTO> partialUpdate(ExperienceDTO experienceDTO) {
        log.debug("Request to partially update Experience : {}", experienceDTO);

        return experienceRepository
            .findById(experienceDTO.getId())
            .map(existingExperience -> {
                experienceMapper.partialUpdate(existingExperience, experienceDTO);

                return existingExperience;
            })
            .map(experienceRepository::save)
            .map(savedExperience -> {
                experienceSearchRepository.save(savedExperience);

                return savedExperience;
            })
            .map(experienceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExperienceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Experiences");
        return experienceRepository.findAll(pageable).map(experienceMapper::toDto);
    }

    public Page<ExperienceDTO> findAllWithEagerRelationships(Pageable pageable) {
        return experienceRepository.findAllWithEagerRelationships(pageable).map(experienceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ExperienceDTO> findOne(Long id) {
        log.debug("Request to get Experience : {}", id);
        return experienceRepository.findOneWithEagerRelationships(id).map(experienceMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Experience : {}", id);
        experienceRepository.deleteById(id);
        experienceSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExperienceDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Experiences for query {}", query);
        return experienceSearchRepository.search(query, pageable).map(experienceMapper::toDto);
    }
}
