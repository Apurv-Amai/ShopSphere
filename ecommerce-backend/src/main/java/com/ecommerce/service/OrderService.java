package com.ecommerce.service;

import java.util.List;

import com.ecommerce.entity.Order;

public interface OrderService {

    Order checkout(Long userId);

    List<Order> getOrdersByUser(
            Long userId);
}