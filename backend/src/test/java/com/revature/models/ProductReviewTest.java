package com.revature.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

class ProductReviewTest {
    /**
     * Method under test: {@link ProductReview#canEqual(Object)}
     */
    @Test
    void testCanEqual() {
        // Arrange, Act and Assert
        assertFalse((new ProductReview()).canEqual("Other"));
    }

    /**
     * Method under test: {@link ProductReview#canEqual(Object)}
     */
    @Test
    void testCanEqual2() {
        // Arrange
        ProductReview productReview = new ProductReview();

        ProductReview productReview1 = new ProductReview();
        productReview1.setId(1);
        productReview1.setProductId(123);
        productReview1.setRating(3);
        productReview1.setReview("Review");
        productReview1.setReviewerId(123);
        productReview1.setReviewerName("Reviewer Name");
        productReview1.setTimestamp(LocalDateTime.of(3, 3, 3, 3, 3));
        productReview1.setTitle("Dr");

        // Act and Assert
        assertTrue(productReview.canEqual(productReview1));
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReview#ProductReview()}
     *   <li>{@link ProductReview#setId(int)}
     *   <li>{@link ProductReview#setProductId(int)}
     *   <li>{@link ProductReview#setRating(int)}
     *   <li>{@link ProductReview#setReview(String)}
     *   <li>{@link ProductReview#setReviewerId(int)}
     *   <li>{@link ProductReview#setReviewerName(String)}
     *   <li>{@link ProductReview#setTimestamp(LocalDateTime)}
     *   <li>{@link ProductReview#setTitle(String)}
     *   <li>{@link ProductReview#toString()}
     *   <li>{@link ProductReview#getId()}
     *   <li>{@link ProductReview#getProductId()}
     *   <li>{@link ProductReview#getRating()}
     *   <li>{@link ProductReview#getReview()}
     *   <li>{@link ProductReview#getReviewerId()}
     *   <li>{@link ProductReview#getReviewerName()}
     *   <li>{@link ProductReview#getTimestamp()}
     *   <li>{@link ProductReview#getTitle()}
     * </ul>
     */
    @Test
    void testConstructor() {
        // Arrange and Act
        ProductReview actualProductReview = new ProductReview();
        actualProductReview.setId(1);
        actualProductReview.setProductId(123);
        actualProductReview.setRating(1);
        actualProductReview.setReview("Review");
        actualProductReview.setReviewerId(123);
        actualProductReview.setReviewerName("Reviewer Name");
        LocalDateTime ofResult = LocalDateTime.of(1, 1, 1, 1, 1);
        actualProductReview.setTimestamp(ofResult);
        actualProductReview.setTitle("Dr");
        String actualToStringResult = actualProductReview.toString();

        // Assert
        assertEquals(1, actualProductReview.getId());
        assertEquals(123, actualProductReview.getProductId());
        assertEquals(1, actualProductReview.getRating());
        assertEquals("Review", actualProductReview.getReview());
        assertEquals(123, actualProductReview.getReviewerId());
        assertEquals("Reviewer Name", actualProductReview.getReviewerName());
        assertSame(ofResult, actualProductReview.getTimestamp());
        assertEquals("Dr", actualProductReview.getTitle());
        assertEquals(
                "ProductReview(id=1, productId=123, reviewerId=123, reviewerName=Reviewer Name, timestamp=0001-01-01T01:01,"
                        + " rating=1, title=Dr, review=Review)",
                actualToStringResult);
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReview#ProductReview(int, int, int, String, LocalDateTime, int, String, String)}
     *   <li>{@link ProductReview#setId(int)}
     *   <li>{@link ProductReview#setProductId(int)}
     *   <li>{@link ProductReview#setRating(int)}
     *   <li>{@link ProductReview#setReview(String)}
     *   <li>{@link ProductReview#setReviewerId(int)}
     *   <li>{@link ProductReview#setReviewerName(String)}
     *   <li>{@link ProductReview#setTimestamp(LocalDateTime)}
     *   <li>{@link ProductReview#setTitle(String)}
     *   <li>{@link ProductReview#toString()}
     *   <li>{@link ProductReview#getId()}
     *   <li>{@link ProductReview#getProductId()}
     *   <li>{@link ProductReview#getRating()}
     *   <li>{@link ProductReview#getReview()}
     *   <li>{@link ProductReview#getReviewerId()}
     *   <li>{@link ProductReview#getReviewerName()}
     *   <li>{@link ProductReview#getTimestamp()}
     *   <li>{@link ProductReview#getTitle()}
     * </ul>
     */
    @Test
    void testConstructor2() {
        // Arrange and Act
        ProductReview actualProductReview = new ProductReview(1, 123, 123, "Reviewer Name",
                LocalDateTime.of(1, 1, 1, 1, 1), 1, "Dr", "Review");
        actualProductReview.setId(1);
        actualProductReview.setProductId(123);
        actualProductReview.setRating(1);
        actualProductReview.setReview("Review");
        actualProductReview.setReviewerId(123);
        actualProductReview.setReviewerName("Reviewer Name");
        LocalDateTime ofResult = LocalDateTime.of(1, 1, 1, 1, 1);
        actualProductReview.setTimestamp(ofResult);
        actualProductReview.setTitle("Dr");
        String actualToStringResult = actualProductReview.toString();

        // Assert
        assertEquals(1, actualProductReview.getId());
        assertEquals(123, actualProductReview.getProductId());
        assertEquals(1, actualProductReview.getRating());
        assertEquals("Review", actualProductReview.getReview());
        assertEquals(123, actualProductReview.getReviewerId());
        assertEquals("Reviewer Name", actualProductReview.getReviewerName());
        assertSame(ofResult, actualProductReview.getTimestamp());
        assertEquals("Dr", actualProductReview.getTitle());
        assertEquals(
                "ProductReview(id=1, productId=123, reviewerId=123, reviewerName=Reviewer Name, timestamp=0001-01-01T01:01,"
                        + " rating=1, title=Dr, review=Review)",
                actualToStringResult);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals() {
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

        // Act and Assert
        assertNotEquals(productReview, null);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals2() {
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

        // Act and Assert
        assertNotEquals(productReview, "Different type to ProductReview");
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReview#equals(Object)}
     *   <li>{@link ProductReview#hashCode()}
     * </ul>
     */
    @Test
    void testEquals3() {
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

        // Act and Assert
        assertEquals(productReview, productReview);
        int expectedHashCodeResult = productReview.hashCode();
        assertEquals(expectedHashCodeResult, productReview.hashCode());
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReview#equals(Object)}
     *   <li>{@link ProductReview#hashCode()}
     * </ul>
     */
    @Test
    void testEquals4() {
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
        assertEquals(productReview, productReview1);
        int expectedHashCodeResult = productReview.hashCode();
        assertEquals(expectedHashCodeResult, productReview1.hashCode());
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals5() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(123);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals6() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(1);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals7() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(3);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals8() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Reviewer Name");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals9() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview(null);
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals10() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(1);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals11() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Dr");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals12() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName(null);
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals13() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(3, 1, 1, 1, 1));
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals14() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(null);
        productReview.setTitle("Dr");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals15() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle("Reviewer Name");

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
        assertNotEquals(productReview, productReview1);
    }

    /**
     * Method under test: {@link ProductReview#equals(Object)}
     */
    @Test
    void testEquals16() {
        // Arrange
        ProductReview productReview = new ProductReview();
        productReview.setId(1);
        productReview.setProductId(123);
        productReview.setRating(1);
        productReview.setReview("Review");
        productReview.setReviewerId(123);
        productReview.setReviewerName("Reviewer Name");
        productReview.setTimestamp(LocalDateTime.of(1, 1, 1, 1, 1));
        productReview.setTitle(null);

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
        assertNotEquals(productReview, productReview1);
    }
}

