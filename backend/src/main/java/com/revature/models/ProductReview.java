package com.revature.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_reviews")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int productId;
    private int reviewerId;
    private String reviewerName;
    private LocalDateTime timestamp;

    @Column(columnDefinition = "INTEGER CHECK (rating > 0 AND rating < 6)")
    private int rating;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String review;

    // @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    // @JoinColumn(name = "user_id", nullable = false)
    // private User user;

    // @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    // @JoinColumn(name = "product_id", nullable = false)
    // private Product product;
}
