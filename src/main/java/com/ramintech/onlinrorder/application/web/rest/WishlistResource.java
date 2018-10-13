package com.ramintech.onlinrorder.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ramintech.onlinrorder.application.domain.Wishlist;
import com.ramintech.onlinrorder.application.repository.WishlistRepository;
import com.ramintech.onlinrorder.application.repository.search.WishlistSearchRepository;
import com.ramintech.onlinrorder.application.web.rest.errors.BadRequestAlertException;
import com.ramintech.onlinrorder.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Wishlist.
 */
@RestController
@RequestMapping("/api")
public class WishlistResource {

    private final Logger log = LoggerFactory.getLogger(WishlistResource.class);

    private static final String ENTITY_NAME = "wishlist";

    private final WishlistRepository wishlistRepository;

    private final WishlistSearchRepository wishlistSearchRepository;

    public WishlistResource(WishlistRepository wishlistRepository, WishlistSearchRepository wishlistSearchRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistSearchRepository = wishlistSearchRepository;
    }

    /**
     * POST  /wishlists : Create a new wishlist.
     *
     * @param wishlist the wishlist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wishlist, or with status 400 (Bad Request) if the wishlist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wishlists")
    @Timed
    public ResponseEntity<Wishlist> createWishlist(@Valid @RequestBody Wishlist wishlist) throws URISyntaxException {
        log.debug("REST request to save Wishlist : {}", wishlist);
        if (wishlist.getId() != null) {
            throw new BadRequestAlertException("A new wishlist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Wishlist result = wishlistRepository.save(wishlist);
        wishlistSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/wishlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wishlists : Updates an existing wishlist.
     *
     * @param wishlist the wishlist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wishlist,
     * or with status 400 (Bad Request) if the wishlist is not valid,
     * or with status 500 (Internal Server Error) if the wishlist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wishlists")
    @Timed
    public ResponseEntity<Wishlist> updateWishlist(@Valid @RequestBody Wishlist wishlist) throws URISyntaxException {
        log.debug("REST request to update Wishlist : {}", wishlist);
        if (wishlist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Wishlist result = wishlistRepository.save(wishlist);
        wishlistSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wishlist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wishlists : get all the wishlists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wishlists in body
     */
    @GetMapping("/wishlists")
    @Timed
    public List<Wishlist> getAllWishlists() {
        log.debug("REST request to get all Wishlists");
        return wishlistRepository.findAll();
    }

    /**
     * GET  /wishlists/:id : get the "id" wishlist.
     *
     * @param id the id of the wishlist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wishlist, or with status 404 (Not Found)
     */
    @GetMapping("/wishlists/{id}")
    @Timed
    public ResponseEntity<Wishlist> getWishlist(@PathVariable Long id) {
        log.debug("REST request to get Wishlist : {}", id);
        Optional<Wishlist> wishlist = wishlistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(wishlist);
    }

    /**
     * DELETE  /wishlists/:id : delete the "id" wishlist.
     *
     * @param id the id of the wishlist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wishlists/{id}")
    @Timed
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        log.debug("REST request to delete Wishlist : {}", id);

        wishlistRepository.deleteById(id);
        wishlistSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/wishlists?query=:query : search for the wishlist corresponding
     * to the query.
     *
     * @param query the query of the wishlist search
     * @return the result of the search
     */
    @GetMapping("/_search/wishlists")
    @Timed
    public List<Wishlist> searchWishlists(@RequestParam String query) {
        log.debug("REST request to search Wishlists for query {}", query);
        return StreamSupport
            .stream(wishlistSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
