package com.revature.services;

import com.revature.models.Order;
import com.revature.repositories.OrderRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
   
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
       
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findAllByUserId(int userId) {
        return orderRepository.findAllByUserId(userId);
    }

    public Optional<Order> findById(int orderId) {
        return orderRepository.findById(orderId);
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }
    
    public List<Order> saveAll(List<Order> orderList) {
    	return orderRepository.saveAll(orderList);
    }

    public void delete(int orderId) {
        orderRepository.deleteById(orderId);
    }
}
