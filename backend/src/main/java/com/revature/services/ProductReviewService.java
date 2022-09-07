package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.ProductReview;
import com.revature.repositories.ProductReviewRepository;

@Service
public class ProductReviewService {
    private final ProductReviewRepository productReviewRepository;

    public ProductReviewService(ProductReviewRepository productReviewRepository) {
        this.productReviewRepository = productReviewRepository;
    }

    /**
     * Returns a list of all product reviews in the database. If no product reviews
     * exist, an empty list is returned.
     *
     * @param productId - the id of the product to get reviews for
     * @return a list of all product reviews associated with the given product
     */
    public List<ProductReview> getProductReviews(int productId) {
        return productReviewRepository.findAllByProductId(productId);
    }

    /**
     * Returns the product review with the given id if it exists in the database.
     *
     * @param id - the id of the product review to retrieve
     * @return an optional containing the product review with the given id if it
     *         exists
     */
    public Optional<ProductReview> findById(int id) {
        return productReviewRepository.findById(id);
    }

    /**
     * Saves the given product review to the database.
     *
     * @param productReview - the product review to save
     * @return the saved product review
     */
    public ProductReview save(ProductReview productReview) {
        return productReviewRepository.save(productReview);
    }

    /**
     * Deletes the product review with the given id from the database.
     *
     * @param id - the id of the product review to delete
     */
    public void delete(int id) {
        productReviewRepository.deleteById(id);
    }
}
