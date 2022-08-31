package com.revature.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class ProductReviewRequestTest {
    /**
     * Method under test: {@link ProductReviewRequest#canEqual(Object)}
     */
    @Test
    void testCanEqual() {
        // Arrange, Act and Assert
        assertFalse((new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review")).canEqual("Other"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#canEqual(Object)}
     */
    @Test
    void testCanEqual2() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr",
                "Review");

        // Act and Assert
        assertTrue(productReviewRequest.canEqual(new ProductReviewRequest(123, 123, "Reviewer Name", 3, "Dr", "Review")));
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#ProductReviewRequest()}
     *   <li>{@link ProductReviewRequest#setProductId(int)}
     *   <li>{@link ProductReviewRequest#setRating(int)}
     *   <li>{@link ProductReviewRequest#setReview(String)}
     *   <li>{@link ProductReviewRequest#setReviewerId(int)}
     *   <li>{@link ProductReviewRequest#setReviewerName(String)}
     *   <li>{@link ProductReviewRequest#setTitle(String)}
     *   <li>{@link ProductReviewRequest#toString()}
     *   <li>{@link ProductReviewRequest#getProductId()}
     *   <li>{@link ProductReviewRequest#getRating()}
     *   <li>{@link ProductReviewRequest#getReview()}
     *   <li>{@link ProductReviewRequest#getReviewerId()}
     *   <li>{@link ProductReviewRequest#getReviewerName()}
     *   <li>{@link ProductReviewRequest#getTitle()}
     * </ul>
     */
    @Test
    void testConstructor() {
        // Arrange and Act
        ProductReviewRequest actualProductReviewRequest = new ProductReviewRequest();
        actualProductReviewRequest.setProductId(123);
        actualProductReviewRequest.setRating(1);
        actualProductReviewRequest.setReview("Review");
        actualProductReviewRequest.setReviewerId(123);
        actualProductReviewRequest.setReviewerName("Reviewer Name");
        actualProductReviewRequest.setTitle("Dr");
        String actualToStringResult = actualProductReviewRequest.toString();

        // Assert
        assertEquals(123, actualProductReviewRequest.getProductId());
        assertEquals(1, actualProductReviewRequest.getRating());
        assertEquals("Review", actualProductReviewRequest.getReview());
        assertEquals(123, actualProductReviewRequest.getReviewerId());
        assertEquals("Reviewer Name", actualProductReviewRequest.getReviewerName());
        assertEquals("Dr", actualProductReviewRequest.getTitle());
        assertEquals("ProductReviewRequest(productId=123, reviewerId=123, reviewerName=Reviewer Name, rating=1, title=Dr,"
                + " review=Review)", actualToStringResult);
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#ProductReviewRequest(int, int, String, int, String, String)}
     *   <li>{@link ProductReviewRequest#setProductId(int)}
     *   <li>{@link ProductReviewRequest#setRating(int)}
     *   <li>{@link ProductReviewRequest#setReview(String)}
     *   <li>{@link ProductReviewRequest#setReviewerId(int)}
     *   <li>{@link ProductReviewRequest#setReviewerName(String)}
     *   <li>{@link ProductReviewRequest#setTitle(String)}
     *   <li>{@link ProductReviewRequest#toString()}
     *   <li>{@link ProductReviewRequest#getProductId()}
     *   <li>{@link ProductReviewRequest#getRating()}
     *   <li>{@link ProductReviewRequest#getReview()}
     *   <li>{@link ProductReviewRequest#getReviewerId()}
     *   <li>{@link ProductReviewRequest#getReviewerName()}
     *   <li>{@link ProductReviewRequest#getTitle()}
     * </ul>
     */
    @Test
    void testConstructor2() {
        // Arrange and Act
        ProductReviewRequest actualProductReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr",
                "Review");
        actualProductReviewRequest.setProductId(123);
        actualProductReviewRequest.setRating(1);
        actualProductReviewRequest.setReview("Review");
        actualProductReviewRequest.setReviewerId(123);
        actualProductReviewRequest.setReviewerName("Reviewer Name");
        actualProductReviewRequest.setTitle("Dr");
        String actualToStringResult = actualProductReviewRequest.toString();

        // Assert
        assertEquals(123, actualProductReviewRequest.getProductId());
        assertEquals(1, actualProductReviewRequest.getRating());
        assertEquals("Review", actualProductReviewRequest.getReview());
        assertEquals(123, actualProductReviewRequest.getReviewerId());
        assertEquals("Reviewer Name", actualProductReviewRequest.getReviewerName());
        assertEquals("Dr", actualProductReviewRequest.getTitle());
        assertEquals("ProductReviewRequest(productId=123, reviewerId=123, reviewerName=Reviewer Name, rating=1, title=Dr,"
                + " review=Review)", actualToStringResult);
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals() {
        // Arrange, Act and Assert
        assertNotEquals(new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"), null);
        assertNotEquals(new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"),
                "Different type to ProductReviewRequest");
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#equals(Object)}
     *   <li>{@link ProductReviewRequest#hashCode()}
     * </ul>
     */
    @Test
    void testEquals2() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr",
                "Review");

        // Act and Assert
        assertEquals(productReviewRequest, productReviewRequest);
        int expectedHashCodeResult = productReviewRequest.hashCode();
        assertEquals(expectedHashCodeResult, productReviewRequest.hashCode());
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#equals(Object)}
     *   <li>{@link ProductReviewRequest#hashCode()}
     * </ul>
     */
    @Test
    void testEquals3() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr",
                "Review");
        ProductReviewRequest productReviewRequest1 = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr",
                "Review");

        // Act and Assert
        assertEquals(productReviewRequest, productReviewRequest1);
        int expectedHashCodeResult = productReviewRequest.hashCode();
        assertEquals(expectedHashCodeResult, productReviewRequest1.hashCode());
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals4() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(1, 123, "Reviewer Name", 1, "Dr", "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals5() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 1, "Reviewer Name", 1, "Dr", "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals6() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Dr", 1, "Dr", "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals7() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, null, 1, "Dr", "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals8() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 3, "Dr",
                "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals9() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1,
                "Reviewer Name", "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals10() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, null,
                "Review");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals11() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr",
                "Reviewer Name");

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Method under test: {@link ProductReviewRequest#equals(Object)}
     */
    @Test
    void testEquals12() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", null);

        // Act and Assert
        assertNotEquals(productReviewRequest, new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", "Review"));
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#equals(Object)}
     *   <li>{@link ProductReviewRequest#hashCode()}
     * </ul>
     */
    @Test
    void testEquals13() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, null, 1, "Dr", "Review");
        ProductReviewRequest productReviewRequest1 = new ProductReviewRequest(123, 123, null, 1, "Dr", "Review");

        // Act and Assert
        assertEquals(productReviewRequest, productReviewRequest1);
        int expectedHashCodeResult = productReviewRequest.hashCode();
        assertEquals(expectedHashCodeResult, productReviewRequest1.hashCode());
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#equals(Object)}
     *   <li>{@link ProductReviewRequest#hashCode()}
     * </ul>
     */
    @Test
    void testEquals14() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, null,
                "Review");
        ProductReviewRequest productReviewRequest1 = new ProductReviewRequest(123, 123, "Reviewer Name", 1, null,
                "Review");

        // Act and Assert
        assertEquals(productReviewRequest, productReviewRequest1);
        int expectedHashCodeResult = productReviewRequest.hashCode();
        assertEquals(expectedHashCodeResult, productReviewRequest1.hashCode());
    }

    /**
     * Methods under test:
     *
     * <ul>
     *   <li>{@link ProductReviewRequest#equals(Object)}
     *   <li>{@link ProductReviewRequest#hashCode()}
     * </ul>
     */
    @Test
    void testEquals15() {
        // Arrange
        ProductReviewRequest productReviewRequest = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", null);
        ProductReviewRequest productReviewRequest1 = new ProductReviewRequest(123, 123, "Reviewer Name", 1, "Dr", null);

        // Act and Assert
        assertEquals(productReviewRequest, productReviewRequest1);
        int expectedHashCodeResult = productReviewRequest.hashCode();
        assertEquals(expectedHashCodeResult, productReviewRequest1.hashCode());
    }
}

