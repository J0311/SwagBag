package com.revature.controllers;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dtos.ProductReviewRequest;
import com.revature.models.ProductReview;
import com.revature.services.ProductReviewService;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {ProductReviewController.class})
@ExtendWith(SpringExtension.class)
class ProductReviewControllerTest {
    @Autowired
    private ProductReviewController productReviewController;

    @MockBean
    private ProductReviewService productReviewService;

    /**
     * Method under test: {@link ProductReviewController#delete(int)}
     */
    @Test
    void testDelete() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        Optional<ProductReview> ofResult = Optional.of(productReview);
        doNothing().when(productReviewService).delete(anyInt());
        when(productReviewService.findById(anyInt())).thenReturn(ofResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/product-reviews/{id}", 1);

        // Act and Assert
        MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    /**
     * Method under test: {@link ProductReviewController#delete(int)}
     */
    @Test
    void testDelete2() throws Exception {
        // Arrange
        doNothing().when(productReviewService).delete(anyInt());
        when(productReviewService.findById(anyInt())).thenReturn(Optional.empty());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/product-reviews/{id}", 1);

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    /**
     * Method under test: {@link ProductReviewController#getById(int)}
     */
    @Test
    void testGetById() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        Optional<ProductReview> ofResult = Optional.of(productReview);
        when(productReviewService.findById(anyInt())).thenReturn(ofResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/product-reviews/{id}", 1);

        // Act and Assert
        MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"id\":1,\"productId\":123,\"reviewerId\":123,\"reviewerName\":\"Reviewer Name\",\"timestamp\":[1,1,1,1,1],\"rating"
                                        + "\":1,\"title\":\"Dr\",\"review\":\"Review\"}"));
    }

    /**
     * Method under test: {@link ProductReviewController#getById(int)}
     */
    @Test
    void testGetById2() throws Exception {
        // Arrange
        when(productReviewService.findById(anyInt())).thenReturn(Optional.empty());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/product-reviews/{id}", 1);

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    /**
     * Method under test: {@link ProductReviewController#getById(int)}
     */
    @Test
    void testGetById3() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        Optional<ProductReview> ofResult = Optional.of(productReview);
        when(productReviewService.findById(anyInt())).thenReturn(ofResult);
        MockHttpServletRequestBuilder getResult = MockMvcRequestBuilders.get("/api/product-reviews/{id}", 1);
        getResult.accept("https://example.org/example");

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(getResult);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(406));
    }

    /**
     * Method under test: {@link ProductReviewController#getProductReviews(int)}
     */
    @Test
    void testGetProductReviews() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        Optional<ProductReview> ofResult = Optional.of(productReview);
        when(productReviewService.findById(anyInt())).thenReturn(ofResult);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/product-reviews/{productId}",
                123);

        // Act and Assert
        MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"id\":1,\"productId\":123,\"reviewerId\":123,\"reviewerName\":\"Reviewer Name\",\"timestamp\":[1,1,1,1,1],\"rating"
                                        + "\":1,\"title\":\"Dr\",\"review\":\"Review\"}"));
    }

    /**
     * Method under test: {@link ProductReviewController#getProductReviews(int)}
     */
    @Test
    void testGetProductReviews2() throws Exception {
        // Arrange
        when(productReviewService.findById(anyInt())).thenReturn(Optional.empty());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/product-reviews/{productId}",
                123);

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    /**
     * Method under test: {@link ProductReviewController#getProductReviews(int)}
     */
    @Test
    void testGetProductReviews3() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        Optional<ProductReview> ofResult = Optional.of(productReview);
        when(productReviewService.findById(anyInt())).thenReturn(ofResult);
        MockHttpServletRequestBuilder getResult = MockMvcRequestBuilders.get("/api/product-reviews/{productId}", 123);
        getResult.accept("https://example.org/example");

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(getResult);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(406));
    }

    /**
     * Method under test: {@link ProductReviewController#save(ProductReviewRequest)}
     */
    @Test
    void testSave() throws Exception {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest();
        productReviewRequest.setProductId(123);
        productReviewRequest.setRating(1);
        productReviewRequest.setReview("Review");
        productReviewRequest.setReviewerId(123);
        productReviewRequest.setReviewerName("Reviewer Name");
        productReviewRequest.setTitle("Dr");
        String content = (new ObjectMapper()).writeValueAsString(productReviewRequest);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/product-reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(405));
    }

    /**
     * Method under test: {@link ProductReviewController#update(int, ProductReview)}
     */
    @Test
    void testUpdate() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        Optional<ProductReview> ofResult = Optional.of(productReview);

        ProductReview productReview1 = new ProductReview();
        productReview1.setId(1);
        productReview1.setProductId(123);
        productReview1.setRating(1);
        productReview1.setReview("Review");
        productReview1.setReviewerId(123);
        productReview1.setReviewerName("Reviewer Name");
        productReview1.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview1.setTitle("Dr");
        when(productReviewService.save((ProductReview) any())).thenReturn(productReview1);
        when(productReviewService.findById(anyInt())).thenReturn(ofResult);

        ProductReview productReview2 = new ProductReview();
        productReview2.setId(1);
        productReview2.setProductId(123);
        productReview2.setRating(1);
        productReview2.setReview("Review");
        productReview2.setReviewerId(123);
        productReview2.setReviewerName("Reviewer Name");
        productReview2.setTimestamp(null);
        productReview2.setTitle("Dr");
        String content = (new ObjectMapper()).writeValueAsString(productReview2);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/product-reviews/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

        // Act and Assert
        MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"id\":1,\"productId\":123,\"reviewerId\":123,\"reviewerName\":\"Reviewer Name\",\"timestamp\":[1,1,1,1,1],\"rating"
                                        + "\":1,\"title\":\"Dr\",\"review\":\"Review\"}"));
    }

    /**
     * Method under test: {@link ProductReviewController#update(int, ProductReview)}
     */
    @Test
    void testUpdate2() throws Exception {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");
        when(productReviewService.save((ProductReview) any())).thenReturn(productReview);
        when(productReviewService.findById(anyInt())).thenReturn(Optional.empty());

        ProductReview productReview1 = new ProductReview();
        productReview1.setId(1);
        productReview1.setProductId(123);
        productReview1.setRating(1);
        productReview1.setReview("Review");
        productReview1.setReviewerId(123);
        productReview1.setReviewerName("Reviewer Name");
        productReview1.setTimestamp(null);
        productReview1.setTitle("Dr");
        String content = (new ObjectMapper()).writeValueAsString(productReview1);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/product-reviews/{id}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(productReviewController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}

