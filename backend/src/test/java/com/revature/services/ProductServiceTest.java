package com.revature.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.revature.models.Product;
import com.revature.repositories.ProductRepository;

@ContextConfiguration(classes = { ProductService.class })
@ExtendWith(SpringExtension.class)
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;

    private Product p1 = new Product(1, 5, 7.99F, "test description", "img", "TeeShirt");
    private Product p2 = new Product(2, 20, 39.99F, "test description", "img", "Bag");
    private Product p3 = new Product(3, 1, 12.49F, "test description", "img", "Mug");
    private List<Product> productList;

    @BeforeEach
    public void setup() {
        productList = new ArrayList<>();
        productList.add(p1);
        productList.add(p2);
        productList.add(p3);
    }

    @Test
    void testDelete() {
        Mockito.when(productRepository.save(p1)).thenReturn(p1);
        Product p = productService.save(p1);
        productService.delete(p.getId());
        assertFalse(productService.findById(p.getId()).isPresent());
    }

    @Test
    void testFindAll() {
        Mockito.when(productRepository.findAll()).thenReturn(productList);
        List<Product> actualList = productService.findAll();
        assertEquals(productList.size(), actualList.size());
    }

    @Test
    void testFindById() {
        Optional<Product> expected = Optional.of(p3);
        Mockito.when(productRepository.findById(Mockito.anyInt())).thenReturn(expected);
        Optional<Product> actual = productService.findById(p3.getId());
        assertTrue(actual.isPresent());
        assertEquals(expected.get().getId(), actual.get().getId());
        assertEquals(expected.get().getName(), actual.get().getName());
    }

    @Test
    void testSearchByName() {
        List<Product> expected = new ArrayList<>();
        expected.add(p2);   // "Bag"
        expected.add(p3);   // "Mug"
        Mockito.when(productRepository.searchByName(Mockito.anyString())).thenReturn(expected);
        List<Product> actual = productService.searchByName("G");
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void testSave() {
        Product expected = p2;
        Mockito.when(productRepository.save(Mockito.any())).thenReturn(expected);
        Product actual = productService.save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void testSaveAll() {
        List<Product> expected = productList;
        Mockito.when(productRepository.saveAll(Mockito.any())).thenReturn(expected);
        List<Product> actual = productService.saveAll(productList, null);
        assertEquals(expected.size(), actual.size());
    }
}
