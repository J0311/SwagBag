package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.ProductInfo;
import com.revature.models.Order;
import com.revature.models.Product;
import com.revature.services.OrderService;
import com.revature.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Authorized
    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable("userId") int userId) {
        return ResponseEntity.ok(orderService.findAllByUserId(userId));
    }

    
}
