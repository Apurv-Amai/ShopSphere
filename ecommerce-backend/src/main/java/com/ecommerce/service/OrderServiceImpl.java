package com.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.ecommerce.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.OrderStatus;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ProductRepository productRepository;

	@Transactional
	@Override
	public Order checkout(Long userId) {

		User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found"));

		Cart cart = cartRepository.findByUserUserId(userId).orElseThrow(() -> new RuntimeException("Cart Not Found"));

		if (cart.getCartItems().isEmpty()) {
			throw new RuntimeException("Cart Is Empty");
		}

		Order order = new Order();

		order.setUser(user);
		order.setOrderDate(LocalDateTime.now());
		order.setStatus(OrderStatus.PLACED);

		double totalAmount = 0;

		for (CartItem cartItem : cart.getCartItems()) {

			Product product = cartItem.getProduct();

			// Stock Validation
			if (cartItem.getQuantity() > product.getQuantity()) {

				throw new RuntimeException("Insufficient Stock For " + product.getProductName());
			}

			// Reduce Stock
			product.setQuantity(product.getQuantity() - cartItem.getQuantity());

			productRepository.save(product);

			OrderItem orderItem = new OrderItem();

			orderItem.setOrder(order);
			orderItem.setProduct(product);
			orderItem.setQuantity(cartItem.getQuantity());

			orderItem.setPrice(product.getPrice());

			order.getOrderItems().add(orderItem);

			totalAmount += product.getPrice() * cartItem.getQuantity();
		}

		order.setTotalAmount(totalAmount);

		Order savedOrder = orderRepository.save(order);

		// Clear Cart

		cart.getCartItems().clear();

		cartRepository.save(cart);

		return savedOrder;
	}

	@Override
	public List<Order> getOrdersByUser(Long userId) {

		return orderRepository.findByUserUserId(userId);
	}
}