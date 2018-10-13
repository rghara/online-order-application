package com.ramintech.onlinrorder.application.web.rest;

import com.ramintech.onlinrorder.application.OnlinrOrderApplicationApp;

import com.ramintech.onlinrorder.application.domain.Wishlist;
import com.ramintech.onlinrorder.application.repository.WishlistRepository;
import com.ramintech.onlinrorder.application.repository.search.WishlistSearchRepository;
import com.ramintech.onlinrorder.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.ramintech.onlinrorder.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WishlistResource REST controller.
 *
 * @see WishlistResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OnlinrOrderApplicationApp.class)
public class WishlistResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_RESTRICTED = false;
    private static final Boolean UPDATED_RESTRICTED = true;

    @Autowired
    private WishlistRepository wishlistRepository;

    /**
     * This repository is mocked in the com.ramintech.onlinrorder.application.repository.search test package.
     *
     * @see com.ramintech.onlinrorder.application.repository.search.WishlistSearchRepositoryMockConfiguration
     */
    @Autowired
    private WishlistSearchRepository mockWishlistSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWishlistMockMvc;

    private Wishlist wishlist;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WishlistResource wishlistResource = new WishlistResource(wishlistRepository, mockWishlistSearchRepository);
        this.restWishlistMockMvc = MockMvcBuilders.standaloneSetup(wishlistResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Wishlist createEntity(EntityManager em) {
        Wishlist wishlist = new Wishlist()
            .title(DEFAULT_TITLE)
            .restricted(DEFAULT_RESTRICTED);
        return wishlist;
    }

    @Before
    public void initTest() {
        wishlist = createEntity(em);
    }

    @Test
    @Transactional
    public void createWishlist() throws Exception {
        int databaseSizeBeforeCreate = wishlistRepository.findAll().size();

        // Create the Wishlist
        restWishlistMockMvc.perform(post("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isCreated());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeCreate + 1);
        Wishlist testWishlist = wishlistList.get(wishlistList.size() - 1);
        assertThat(testWishlist.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testWishlist.isRestricted()).isEqualTo(DEFAULT_RESTRICTED);

        // Validate the Wishlist in Elasticsearch
        verify(mockWishlistSearchRepository, times(1)).save(testWishlist);
    }

    @Test
    @Transactional
    public void createWishlistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wishlistRepository.findAll().size();

        // Create the Wishlist with an existing ID
        wishlist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWishlistMockMvc.perform(post("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isBadRequest());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeCreate);

        // Validate the Wishlist in Elasticsearch
        verify(mockWishlistSearchRepository, times(0)).save(wishlist);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = wishlistRepository.findAll().size();
        // set the field null
        wishlist.setTitle(null);

        // Create the Wishlist, which fails.

        restWishlistMockMvc.perform(post("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isBadRequest());

        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWishlists() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        // Get all the wishlistList
        restWishlistMockMvc.perform(get("/api/wishlists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wishlist.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].restricted").value(hasItem(DEFAULT_RESTRICTED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        // Get the wishlist
        restWishlistMockMvc.perform(get("/api/wishlists/{id}", wishlist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wishlist.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.restricted").value(DEFAULT_RESTRICTED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWishlist() throws Exception {
        // Get the wishlist
        restWishlistMockMvc.perform(get("/api/wishlists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        int databaseSizeBeforeUpdate = wishlistRepository.findAll().size();

        // Update the wishlist
        Wishlist updatedWishlist = wishlistRepository.findById(wishlist.getId()).get();
        // Disconnect from session so that the updates on updatedWishlist are not directly saved in db
        em.detach(updatedWishlist);
        updatedWishlist
            .title(UPDATED_TITLE)
            .restricted(UPDATED_RESTRICTED);

        restWishlistMockMvc.perform(put("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWishlist)))
            .andExpect(status().isOk());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeUpdate);
        Wishlist testWishlist = wishlistList.get(wishlistList.size() - 1);
        assertThat(testWishlist.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testWishlist.isRestricted()).isEqualTo(UPDATED_RESTRICTED);

        // Validate the Wishlist in Elasticsearch
        verify(mockWishlistSearchRepository, times(1)).save(testWishlist);
    }

    @Test
    @Transactional
    public void updateNonExistingWishlist() throws Exception {
        int databaseSizeBeforeUpdate = wishlistRepository.findAll().size();

        // Create the Wishlist

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWishlistMockMvc.perform(put("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isBadRequest());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Wishlist in Elasticsearch
        verify(mockWishlistSearchRepository, times(0)).save(wishlist);
    }

    @Test
    @Transactional
    public void deleteWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        int databaseSizeBeforeDelete = wishlistRepository.findAll().size();

        // Get the wishlist
        restWishlistMockMvc.perform(delete("/api/wishlists/{id}", wishlist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Wishlist in Elasticsearch
        verify(mockWishlistSearchRepository, times(1)).deleteById(wishlist.getId());
    }

    @Test
    @Transactional
    public void searchWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);
        when(mockWishlistSearchRepository.search(queryStringQuery("id:" + wishlist.getId())))
            .thenReturn(Collections.singletonList(wishlist));
        // Search the wishlist
        restWishlistMockMvc.perform(get("/api/_search/wishlists?query=id:" + wishlist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wishlist.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].restricted").value(hasItem(DEFAULT_RESTRICTED.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Wishlist.class);
        Wishlist wishlist1 = new Wishlist();
        wishlist1.setId(1L);
        Wishlist wishlist2 = new Wishlist();
        wishlist2.setId(wishlist1.getId());
        assertThat(wishlist1).isEqualTo(wishlist2);
        wishlist2.setId(2L);
        assertThat(wishlist1).isNotEqualTo(wishlist2);
        wishlist1.setId(null);
        assertThat(wishlist1).isNotEqualTo(wishlist2);
    }
}
