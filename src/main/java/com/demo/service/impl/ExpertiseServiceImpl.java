package com.demo.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.demo.domain.Expertise;
import com.demo.repository.ExpertiseRepository;
import com.demo.repository.search.ExpertiseSearchRepository;
import com.demo.service.ExpertiseService;
import com.demo.service.dto.ExpertiseDTO;
import com.demo.service.mapper.ExpertiseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Expertise}.
 */
@Service
@Transactional
public class ExpertiseServiceImpl implements ExpertiseService {

    private final Logger log = LoggerFactory.getLogger(ExpertiseServiceImpl.class);

    private final ExpertiseRepository expertiseRepository;

    private final ExpertiseMapper expertiseMapper;

    private final ExpertiseSearchRepository expertiseSearchRepository;

    public ExpertiseServiceImpl(
        ExpertiseRepository expertiseRepository,
        ExpertiseMapper expertiseMapper,
        ExpertiseSearchRepository expertiseSearchRepository
    ) {
        this.expertiseRepository = expertiseRepository;
        this.expertiseMapper = expertiseMapper;
        this.expertiseSearchRepository = expertiseSearchRepository;
    }

    @Override
    public ExpertiseDTO save(ExpertiseDTO expertiseDTO) {
        log.debug("Request to save Expertise : {}", expertiseDTO);
        Expertise expertise = expertiseMapper.toEntity(expertiseDTO);
        expertise = expertiseRepository.save(expertise);
        ExpertiseDTO result = expertiseMapper.toDto(expertise);
        expertiseSearchRepository.index(expertise);
        return result;
    }

    @Override
    public ExpertiseDTO update(ExpertiseDTO expertiseDTO) {
        log.debug("Request to update Expertise : {}", expertiseDTO);
        Expertise expertise = expertiseMapper.toEntity(expertiseDTO);
        expertise = expertiseRepository.save(expertise);
        ExpertiseDTO result = expertiseMapper.toDto(expertise);
        expertiseSearchRepository.index(expertise);
        return result;
    }

    @Override
    public Optional<ExpertiseDTO> partialUpdate(ExpertiseDTO expertiseDTO) {
        log.debug("Request to partially update Expertise : {}", expertiseDTO);

        return expertiseRepository
            .findById(expertiseDTO.getId())
            .map(existingExpertise -> {
                expertiseMapper.partialUpdate(existingExpertise, expertiseDTO);

                return existingExpertise;
            })
            .map(expertiseRepository::save)
            .map(savedExpertise -> {
                expertiseSearchRepository.save(savedExpertise);

                return savedExpertise;
            })
            .map(expertiseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExpertiseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Expertise");
        return expertiseRepository.findAll(pageable).map(expertiseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ExpertiseDTO> findOne(Long id) {
        log.debug("Request to get Expertise : {}", id);
        return expertiseRepository.findById(id).map(expertiseMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Expertise : {}", id);
        expertiseRepository.deleteById(id);
        expertiseSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExpertiseDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Expertise for query {}", query);
        return expertiseSearchRepository.search(query, pageable).map(expertiseMapper::toDto);
    }
}
