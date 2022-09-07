package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.models.Order;
import com.revature.models.User;
import com.revature.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = { "http://localhost:4200",
        "http://swagbag.us-east-1.elasticbeanstalk.com" }, allowCredentials = "true")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Returns a list of all orders in the database.
     * 
     * @param req - the request object that will be used to get the user's
     *            information from the session
     * @return ResponseEntity<List<Order>> with status code 200 if successful
     */
    @Authorized
    @GetMapping("/history")
    public ResponseEntity<List<Order>> getOrderHistory(HttpServletRequest req) {
        HttpSession session = req.getSession();
        if (session.getAttribute("user") == null) {
            return ResponseEntity.badRequest().build();
        }
        User user = (User) session.getAttribute("user");
        return ResponseEntity.ok(orderService.findAllByUserId(user.getId()));
    }

}
