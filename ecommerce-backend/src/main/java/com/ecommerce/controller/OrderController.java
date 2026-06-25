package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.entity.Order;
import com.ecommerce.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout/{userId}")
    public Order checkout(
            @PathVariable Long userId) {

        return orderService
                .checkout(userId);
    }

    @GetMapping("/{userId}")
    public List<Order> getOrders(
            @PathVariable Long userId) {

        return orderService
                .getOrdersByUser(userId);
    }
}