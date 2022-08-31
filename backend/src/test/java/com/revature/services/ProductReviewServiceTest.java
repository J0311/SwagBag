package com.revature.services;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.revature.models.ProductReview;
import com.revature.repositories.ProductReviewRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {ProductReviewService.class})
@ExtendWith(SpringExtension.class)
class ProductReviewServiceTest {
    @MockBean
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private ProductReviewService productReviewService;

    /**
     * Method under test: {@link ProductReviewService#getProductReviews(int)}
     */
    @Test
    void testGetProductReviews() {
        // Arrange
        ArrayList<ProductReview> productReviewList = new ArrayList<>();
        when(productReviewRepository.findAllByProductId(anyInt())).thenReturn(productReviewList);

        // Act
        List<ProductReview> actualProductReviews = productReviewService.getProductReviews(123);

        // Assert
        assertSame(productReviewList, actualProductReviews);
        assertTrue(actualProductReviews.isEmpty());
        verify(productReviewRepository).findAllByProductId(anyInt());
    }

    /**
     * Method under test: {@link ProductReviewService#findById(int)}
     */
    @Test
    void testFindById() {
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
        when(productReviewRepository.findById((Integer) any())).thenReturn(ofResult);

        // Act
        Optional<ProductReview> actualFindByIdResult = productReviewService.findById(1);

        // Assert
        assertSame(ofResult, actualFindByIdResult);
        assertTrue(actualFindByIdResult.isPresent());
        verify(productReviewRepository).findById((Integer) any());
    }

    /**
     * Method under test: {@link ProductReviewService#save(ProductReview)}
     */
    @Test
    void testSave() {
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
        when(productReviewRepository.save((ProductReview) any())).thenReturn(productReview);

        ProductReview productReview1 = new ProductReview();
        productReview1.setId(1);
        productReview1.setProductId(123);
        productReview1.setRating(1);
        productReview1.setReview("Review");
        productReview1.setReviewerId(123);
        productReview1.setReviewerName("Reviewer Name");
        productReview1.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview1.setTitle("Dr");

        // Act and Assert
        assertSame(productReview, productReviewService.save(productReview1));
        verify(productReviewRepository).save((ProductReview) any());
    }

    /**
     * Method under test: {@link ProductReviewService#delete(int)}
     */
    @Test
    void testDelete() {
        // Arrange
        doNothing().when(productReviewRepository).deleteById((Integer) any());

        // Act
        productReviewService.delete(1);

        // Assert that nothing has changed
        verify(productReviewRepository).deleteById((Integer) any());
    }
}

