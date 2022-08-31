package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revature.models.ProductReview;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    @Query(value = "SELECT * FROM product_reviews WHERE product_id = :productId", nativeQuery = true)
    List<ProductReview> findAllByProductId(@Param("productId") int productId);
}
