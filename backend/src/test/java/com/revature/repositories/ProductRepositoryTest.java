package com.revature.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

import com.revature.models.Product;

@ContextConfiguration(classes = {ProductRepository.class})
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.revature.models"})
@DataJpaTest(properties = {"spring.main.allow-bean-definition-overriding=true"})
public class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    void testGetSearchedProducts() {

        Product shirt = new Product(1, 12, 39.99F, "a product", "img", "Shirt");
        Product bag = new Product(2, 5, 100.29F, "a product", "img", "Bag");
        Product mug = new Product(3, 7, 43.76F, "a product", "img", "Mug");

        List<Product> productList = new ArrayList<>();
        productList.add(shirt);
        productList.add(bag);
        productList.add(mug);
        productRepository.saveAll(productList);

        List<Product> actual1 = productRepository.searchByName("G");
        assertEquals(2, actual1.size()); // "Bag" and "Mug"

        List<Product> actual2 = productRepository.searchByName("123");
        assertEquals(0, actual2.size());

        List<Product> actual3 = productRepository.searchByName("sh");
        assertEquals(1, actual3.size()); // "Shirt"
        assertEquals(shirt.getPrice(), actual3.get(0).getPrice());
    }
}
