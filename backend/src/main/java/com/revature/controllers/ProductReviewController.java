package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import com.revature.dtos.ProductReviewRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.models.ProductReview;
import com.revature.services.ProductReviewService;

import static java.time.LocalDateTime.*;

@RestController
@RequestMapping("/api/product-reviews")
@CrossOrigin(origins = { "http://localhost:4200",
        "http://swagbag.us-east-1.elasticbeanstalk.com" }, allowCredentials = "true")
public class ProductReviewController {
    private final ProductReviewService productReviewService;

    public ProductReviewController(ProductReviewService productReviewService) {
        this.productReviewService = productReviewService;
    }

    @Authorized
    @GetMapping(path = "/{productId}", produces = "application/json")
    public ResponseEntity<List<ProductReview>> getProductReviews(@PathVariable int productId) {
        return new ResponseEntity<>(productReviewService.getProductReviews(productId), HttpStatus.OK);
    }

    @Authorized
    @GetMapping("/{id}")
    public ResponseEntity<ProductReview> getById(@PathVariable("id") int id) {
        Optional<ProductReview> optional = productReviewService.findById(id);

        return optional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }

    @Authorized
    @PostMapping
    public ResponseEntity<ProductReview> save(@RequestBody ProductReviewRequest productReviewRequest) {
        ProductReview productReview = new ProductReview(0,
                productReviewRequest.getProductId(),
                productReviewRequest.getReviewerId(),
                productReviewRequest.getReviewerName(),
                now(),
                productReviewRequest.getRating(),
                productReviewRequest.getTitle(),
                productReviewRequest.getReview());
        return ResponseEntity.status(HttpStatus.CREATED).body(productReviewService.save(productReview));
    }

    @Authorized
    @PutMapping("/{id}")
    public ResponseEntity<ProductReview> update(@PathVariable("id") int id, @RequestBody ProductReview productReview) {
        Optional<ProductReview> optional = productReviewService.findById(id);

        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        productReview.setId(id);
        return ResponseEntity.ok(productReviewService.save(productReview));
    }

    @Authorized
    @DeleteMapping("/{id}")
    public ResponseEntity<ProductReview> delete(@PathVariable("id") int id) {
        Optional<ProductReview> optional = productReviewService.findById(id);

        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        productReviewService.delete(id);
        return ResponseEntity.ok().build();
    }
}
