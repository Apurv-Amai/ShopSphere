package com.ecommerce.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.User;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.exception.UserNotFoundException;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Cart addToCart(CartRequest request) {

		User user = userRepository.findById(request.getUserId())
				.orElseThrow(() -> new UserNotFoundException("User Not Found"));

		if (user.getRole() == Role.ROLE_ADMIN) {

			throw new RuntimeException("Admin cannot add products to cart");
		}

		Product product = productRepository.findById(request.getProductId())
				.orElseThrow(() -> new ProductNotFoundException("Product Not Found"));

		if (request.getQuantity() > product.getQuantity()) {

			throw new RuntimeException("Insufficient Stock");
		}

		Cart cart = cartRepository.findByUserUserId(user.getUserId()).orElseGet(() -> {

			Cart newCart = new Cart();

			newCart.setUser(user);

			return cartRepository.save(newCart);
		});

		Optional<CartItem> existingItem = cartItemRepository.findByCartCartIdAndProductProductId(cart.getCartId(),
				product.getProductId());

		if (existingItem.isPresent()) {

			CartItem item = existingItem.get();

			int newQuantity = item.getQuantity() + request.getQuantity();

			if (newQuantity > product.getQuantity()) {

				throw new RuntimeException("Insufficient Stock");
			}

			item.setQuantity(newQuantity);

			cartItemRepository.save(item);

		} else {

			CartItem cartItem = new CartItem();

			cartItem.setCart(cart);

			cartItem.setProduct(product);

			cartItem.setQuantity(request.getQuantity());

			cartItemRepository.save(cartItem);
		}

		return cartRepository.findById(cart.getCartId()).orElseThrow(() -> new RuntimeException("Cart Not Found"));
	}

	public Cart getCart(Long userId) {

		return cartRepository.findByUserUserId(userId).orElseGet(() -> {

			Cart cart = new Cart();

			User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found"));

			cart.setUser(user);

			return cartRepository.save(cart);
		});
	}

	@Override
	public Cart updateQuantity(Long cartItemId, Integer quantity) {

		CartItem cartItem = cartItemRepository.findById(cartItemId)
				.orElseThrow(() -> new RuntimeException("Cart Item Not Found"));

		Product product = cartItem.getProduct();

		if (quantity > product.getQuantity()) {

			throw new RuntimeException("Insufficient Stock");
		}

		cartItem.setQuantity(quantity);

		cartItemRepository.save(cartItem);

		return cartItem.getCart();
	}

	@Override
	public Cart removeItem(Long cartItemId) {

		CartItem item = cartItemRepository.findById(cartItemId)
				.orElseThrow(() -> new RuntimeException("Cart Item Not Found"));

		Cart cart = item.getCart();

		cartItemRepository.delete(item);

		return cart;
	}

	@Override
	public Double calculateTotal(Long userId) {

		Cart cart = getCart(userId);

		double total = 0;

		for (CartItem item : cart.getCartItems()) {

			total += item.getProduct().getPrice() * item.getQuantity();
		}

		return total;
	}
}