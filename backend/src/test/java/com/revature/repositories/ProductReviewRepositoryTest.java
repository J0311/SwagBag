package com.revature.repositories;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.revature.models.ProductReview;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(classes = {ProductReviewRepository.class})
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.revature.models"})
@DataJpaTest(properties = {"spring.main.allow-bean-definition-overriding=true"})
class ProductReviewRepositoryTest {
    @Autowired
    private ProductReviewRepository productReviewRepository;

    /**
     * Method under test: {@link ProductReviewRepository#findAllByProductId(int)}
     */
    @Test
    void testFindAllByProductId() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

        ProductReview productReview1 = new ProductReview();
        productReview1.setProductId(123);
        productReview1.setRating(1);
        productReview1.setReview("Review");
        productReview1.setReviewerId(123);
        productReview1.setReviewerName("Reviewer Name");
        productReview1.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview1.setTitle("Dr");
        productReviewRepository.save(productReview);
        productReviewRepository.save(productReview1);

        // Act and Assert
        assertTrue(productReviewRepository.findAllByProductId(1).isEmpty());
    }
}

