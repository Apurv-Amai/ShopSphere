package com.ecommerce.service;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.entity.Cart;

public interface CartService {

	Cart addToCart(CartRequest request);

	Cart getCart(Long userId);

	Cart updateQuantity(Long cartItemId,
	                    Integer quantity);

	Cart removeItem(Long cartItemId);

	Double calculateTotal(Long userId);
}