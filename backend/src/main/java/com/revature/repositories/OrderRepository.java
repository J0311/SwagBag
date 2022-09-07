package com.revature.repositories;

import com.revature.models.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    /**
     * Returns a list of all orders in the database that are associated with the
     * user with the given id.
     *
     * @param userId - the id of the user whose orders are being retrieved
     * @return a list of all orders associated with the given user
     */
    List<Order> findAllByUserId(int userId);
}
