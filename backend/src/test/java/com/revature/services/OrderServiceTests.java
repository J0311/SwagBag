package com.revature.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
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

import com.revature.models.Order;
import com.revature.repositories.OrderRepository;

@ContextConfiguration(classes = { OrderService.class })
@ExtendWith(SpringExtension.class)
public class OrderServiceTests {

    @Autowired
    private OrderService orderService;

    @MockBean
    private OrderRepository orderRepository;

    private Order o1 = new Order(1, null, LocalDateTime.now(), null);
    private Order o2 = new Order(2, null, LocalDateTime.now(), null);
    private Order o3 = new Order(3, null, LocalDateTime.now(), null);
    private Order o4 = new Order(4, null, LocalDateTime.now(), null);
    private ArrayList<Order> orderList;

    @BeforeEach
    public void setup() {
        orderList = new ArrayList<>();
        orderList.add(o1);
        orderList.add(o2);
        orderList.add(o3);
        orderList.add(o4);
    }

    @Test
    void testDelete() {
        Mockito.when(orderRepository.save(o1)).thenReturn(o1);
        Order o = orderService.save(o1);
        orderService.delete(o1.getOrderId());
        boolean actual = orderService.findById(o.getOrderId()).isPresent();
        assertEquals(false, actual);
    }

    @Test
    void testFindAll() {
        Mockito.when(orderRepository.findAll()).thenReturn(orderList);
        List<Order> expectedList = orderService.findAll();
        assertEquals(expectedList.size(), orderList.size());
    }

    @Test
    void testFindAllByUserId() {
        Mockito.when(orderRepository.findAllByUserId(Mockito.anyInt())).thenReturn(orderList);
        List<Order> actual = orderService.findAllByUserId(1);
        assertEquals(orderList.size(), actual.size());

    }

    @Test
    void testFindById() {
        Optional<Order> expected = Optional.of(o1);
        Mockito.when(orderRepository.findById(Mockito.anyInt())).thenReturn(expected);
        Optional<Order> actual = orderService.findById(1);
        assertSame(expected, actual);
        assertTrue(actual.isPresent());
    }

    @Test
    void testSave() {
        Mockito.when(orderRepository.save(Mockito.any())).thenReturn(o1);
        Order saved = orderService.save(o1);
        assertEquals(o1.getOrderId(), saved.getOrderId());
        verify(orderRepository).save(o1);
    }

    @Test
    void testSaveAll() {
        Mockito.when(orderRepository.saveAll(Mockito.any())).thenReturn(orderList);
        List<Order> savedList = orderService.saveAll(orderList);
        assertEquals(orderList.size(), savedList.size());
        verify(orderRepository).saveAll(orderList);
    }
}
