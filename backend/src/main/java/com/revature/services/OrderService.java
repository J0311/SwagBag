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

    /**
     * Returns a list of all orders in the database. If no orders exist, an empty
     * list is returned.
     *
     * @return a list of all orders in the database
     */
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    /**
     * Returns a list of all orders in the database that are associated with the
     * user with the given id. If no orders exist, an empty list is returned.
     *
     * @param userId - the id of the user whose orders are being retrieved
     * @return a list of all orders associated with the given user
     */
    public List<Order> findAllByUserId(int userId) {
        return orderRepository.findAllByUserId(userId);
    }

    /**
     * Returns the order with the given id if it exists in the database.
     *
     * @param orderId - the id of the order to retrieve
     * @return an optional containing the order with the given id if it exists
     */
    public Optional<Order> findById(int orderId) {
        return orderRepository.findById(orderId);
    }

    /**
     * Saves the given order to the database.
     *
     * @param order - the order to save
     * @return the saved order
     */
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Saves the given orders to the database.
     *
     * @param orderList - the list of orders to save
     * @return the list of saved orders
     */
    public List<Order> saveAll(List<Order> orderList) {
        return orderRepository.saveAll(orderList);
    }

    /**
     * Deletes the order with the given id from the database.
     *
     * @param orderId - the id of the order to delete
     */
    public void delete(int orderId) {
        orderRepository.deleteById(orderId);
    }
}
