package com.ramintech.onlinrorder.application.repository.search;

import com.ramintech.onlinrorder.application.domain.Wishlist;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Wishlist entity.
 */
public interface WishlistSearchRepository extends ElasticsearchRepository<Wishlist, Long> {
}
