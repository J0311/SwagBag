package com.revature.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.models.User;
import com.revature.services.OrderService;
import com.revature.services.ProductService;
import com.revature.services.PurchaseService;

@WebMvcTest(ProductController.class)
@ExtendWith(SpringExtension.class)
public class ProductControllerTest {

    @MockBean
    private ProductService productService;

    @MockBean
    private OrderService orderService;

    @MockBean
    private PurchaseService purchaseService;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper jacksonObjectMapper;

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
    void testDeleteProductSucceeds() throws Exception {
        Product expected = p2;
        Mockito.when(productService.findById(expected.getId())).thenReturn(Optional.of(expected));
        String expectedContent = jacksonObjectMapper.writeValueAsString(expected);

        // Perform the request and verify the the response contains the expected status
        // and content
        mvc.perform(
                MockMvcRequestBuilders
                        .delete("/api/product/{id}", expected.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string(expectedContent));

        // Verify the following functions were called on the mock
        InOrder inOrder = Mockito.inOrder(productService);
        inOrder.verify(productService).findById(expected.getId());
        inOrder.verify(productService).delete(expected.getId());
    }

    @Test
    void testDeleteProductFails() throws Exception {
        int testId = 3;
        Mockito.when(productService.findById(testId)).thenReturn(Optional.empty());

        // Perform the request and verify the the response contains the expected status
        // and content
        mvc.perform(
                MockMvcRequestBuilders
                        .delete("/api/product/{id}", testId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        // Verify the following functions were called on the mock
        Mockito.verify(productService).findById(testId);
    }

    @Test
    void testGetInventory() throws Exception {
        Mockito.when(productService.findAll()).thenReturn(productList);
        String expectedContent = jacksonObjectMapper.writeValueAsString(productList);

        // Perform the request and verify the the response contains the expected status
        // and content
        mvc.perform(
                MockMvcRequestBuilders.get("/api/product"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string(expectedContent));

        // Verify the following functions were called on the mock
        Mockito.verify(productService).findAll();
    }

    @Test
    void testGetProductByIdSucceeds() throws Exception {
        Product expected = p3;
        Mockito.when(productService.findById(expected.getId())).thenReturn(Optional.of(expected));
        String expectedContent = jacksonObjectMapper.writeValueAsString(expected);

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .get("/api/product/{id}", expected.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string(expectedContent));
    }

    @Test
    void testGetProductByIdFails() throws Exception {
        Mockito.when(productService.findById(Mockito.anyInt())).thenReturn(Optional.empty());

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .get("/api/product/3"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void testPurchaseSucceeds() throws Exception {
        int availableQuantity = 7;
        int purchaseQuantity = 3;
        int expectedQuantity = 4;
        p1.setQuantity(availableQuantity);
        List<ProductInfo> cart = Collections.singletonList(new ProductInfo(p1.getId(), purchaseQuantity));
        Mockito.when(productService.findById(p1.getId())).thenReturn(Optional.of(p1));
        Product expected = new Product(p1.getId(), expectedQuantity, p1.getPrice(), p1.getDescription(), p1.getImage(),
                p1.getName());
        List<Product> expectedChanges = Collections.singletonList(expected);
        String expectedString = jacksonObjectMapper.writeValueAsString(expectedChanges);

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .patch("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jacksonObjectMapper.writeValueAsString(cart))
                        .sessionAttr("user", new User()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string(expectedString));

        // Verify the following functions were called on the mock
        Mockito.verify(productService).saveAll(Mockito.any(), Mockito.any());
        Mockito.verify(orderService).save(Mockito.any());
        Mockito.verify(purchaseService).saveAll(Mockito.any());
    }

    @Test
    void testPurchaseInvalidQuantity() throws Exception {
        int availableQuantity = 7;
        int purchaseQuantity = 34;
        p1.setQuantity(availableQuantity);
        List<ProductInfo> cart = Collections.singletonList(new ProductInfo(p1.getId(), purchaseQuantity));
        Mockito.when(productService.findById(p1.getId())).thenReturn(Optional.of(p1));

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .patch("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jacksonObjectMapper.writeValueAsString(cart))
                        .sessionAttr("user", new User()))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());

        // Verify the following functions were NOT called on the mock
        Mockito.verify(productService, Mockito.never()).saveAll(Mockito.any(), Mockito.any());
        Mockito.verify(orderService, Mockito.never()).save(Mockito.any());
        Mockito.verify(purchaseService, Mockito.never()).saveAll(Mockito.any());
    }

    @Test
    void testPurchaseInvalidId() throws Exception {
        int availableQuantity = 7;
        int purchaseQuantity = 1;
        p1.setQuantity(availableQuantity);
        List<ProductInfo> cart = Collections.singletonList(new ProductInfo(p1.getId(), purchaseQuantity));
        Mockito.when(productService.findById(p1.getId())).thenReturn(Optional.empty());

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .patch("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jacksonObjectMapper.writeValueAsString(cart))
                        .sessionAttr("user", new User()))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        // Verify the following functions were NOT called on the mock
        Mockito.verify(productService, Mockito.never()).saveAll(Mockito.any(), Mockito.any());
        Mockito.verify(orderService, Mockito.never()).save(Mockito.any());
        Mockito.verify(purchaseService, Mockito.never()).saveAll(Mockito.any());
    }

    @Test
    void testSearchByName() throws Exception {
        String query = "Q";
        List<Product> expected = new ArrayList<>();
        expected.add(p2); // bag
        expected.add(p3); // mug
        Mockito.when(productService.searchByName(query)).thenReturn(expected);
        String expectedContent = jacksonObjectMapper.writeValueAsString(expected);

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .get("/api/product/search/{id}", query))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string(expectedContent));
    }

    @Test
    void updateProduct() throws Exception {
        Product expected = new Product(1, 10, 10.0F, "description", "image", "new name");
        Mockito.when(productService.findById(expected.getId())).thenReturn(Optional.of(expected));
        Mockito.when(productService.save(Mockito.any())).thenReturn(expected);
        String expectedContent = jacksonObjectMapper.writeValueAsString(expected);

        // Perform the request and verify the response contains the expected status and
        // content
        mvc.perform(
                MockMvcRequestBuilders
                        .put("/api/product/{id}", expected.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jacksonObjectMapper.writeValueAsString(expected)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string(expectedContent));
    }
}