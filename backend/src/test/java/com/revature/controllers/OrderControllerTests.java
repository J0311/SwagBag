package com.revature.controllers;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.revature.models.Order;
import com.revature.models.Product;
import com.revature.models.Purchase;
import com.revature.models.User;
import com.revature.services.OrderService;

@WebMvcTest(OrderController.class)
@ExtendWith(SpringExtension.class)
public class OrderControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private OrderService service;
    
    @Test
    void testGetOrderHistory() throws Exception {
        LocalDateTime purchaseTime = LocalDateTime.of(2001, 04, 20, 12, 20, 57);
        Product product = new Product(1, 4, 10.50F, "test description", "test image", "test name");
        List<Purchase> purchaseList = Collections.singletonList(new Purchase(123, null, product, 2, 10.50F));
        List<Order> orderList = Collections.singletonList(new Order(444, null, purchaseTime, purchaseList));
        Mockito.when(service.findAllByUserId(Mockito.anyInt())).thenReturn(orderList);

        mvc.perform(
                MockMvcRequestBuilders.get("/api/order/history")
                    .sessionAttr("user", new User()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
            .andExpect(MockMvcResultMatchers.content().string(
                "[{\"orderId\":444,\"user\":null,\"purchaseTime\":\"" + purchaseTime.toString() + "\",\"purchases\":" +
                "[{\"purchaseId\":123,\"product\":{\"id\":1,\"quantity\":4,\"price\":10.5,\"description\":\"test description\"," +
                "\"image\":\"test image\",\"name\":\"test name\"},\"quantity\":2,\"pricePerItem\":10.5}]}]"));
    }
}
