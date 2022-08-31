package com.revature.repositories;

import com.revature.models.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findAllByUserId(int userId);
    
}
