package com.revature.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

import com.revature.models.Order;
import com.revature.models.User;

@ContextConfiguration(classes = { OrderRepository.class })
@EnableAutoConfiguration
@EntityScan(basePackages = { "com.revature.models" })
@DataJpaTest(properties = { "spring.main.allow-bean-definition-overriding=true" })
public class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void testFindAllByUserId() {

        User user = new User(1, "test@email.com", "secret", "first", "last", "CUSTOMER");
        Order order1 = new Order(1, user, LocalDateTime.now(), null);
        Order order2 = new Order(2, user, LocalDateTime.now(), null);
        Order order3 = new Order(3, user, LocalDateTime.now(), null);
        List<Order> orderList = new ArrayList<>();
        orderList.add(order1);
        orderList.add(order2);
        orderList.add(order3);
        orderRepository.saveAll(orderList);

        List<Order> expectedList = orderRepository.findAllByUserId(user.getId());
        assertEquals(expectedList.size(), orderList.size());
        assertEquals(expectedList.get(0).getOrderId(), orderList.get(0).getOrderId());
    }
}
