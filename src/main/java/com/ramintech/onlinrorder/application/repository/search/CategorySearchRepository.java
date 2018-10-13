package com.ramintech.onlinrorder.application.repository.search;

import com.ramintech.onlinrorder.application.domain.Category;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Category entity.
 */
public interface CategorySearchRepository extends ElasticsearchRepository<Category, Long> {
}
