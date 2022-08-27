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

    public List<ProductReview> getProductReviews(int productId) {
        return productReviewRepository.findAllByProductId(productId);
    }

    public Optional<ProductReview> findById(int id) {
        return productReviewRepository.findById(id);
    }

    public ProductReview save(ProductReview productReview) {
        return productReviewRepository.save(productReview);
    }

    public void delete(int id) {
        productReviewRepository.deleteById(id);
    }
}
