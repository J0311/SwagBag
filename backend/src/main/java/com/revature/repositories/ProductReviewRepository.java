package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revature.models.ProductReview;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    /**
     * Returns a list of all product reviews in the database that are associated
     * with the product with the given id.
     *
     * @param productId - the id of the product to get reviews for
     * @return a list of all product reviews associated with the given product
     */
    @Query(value = "SELECT * FROM product_reviews WHERE product_id = :productId", nativeQuery = true)
    List<ProductReview> findAllByProductId(@Param("productId") int productId);
}
