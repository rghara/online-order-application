package com.ramintech.onlinrorder.application.repository.search;

import com.ramintech.onlinrorder.application.domain.Product;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Product entity.
 */
public interface ProductSearchRepository extends ElasticsearchRepository<Product, Long> {
}
