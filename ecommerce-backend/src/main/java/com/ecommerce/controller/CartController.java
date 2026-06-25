package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.dto.CartRequest;
import com.ecommerce.entity.Cart;
import com.ecommerce.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(
            @RequestBody CartRequest request) {

        System.out.println("ADD TO CART API HIT");

        return cartService.addToCart(request);
    }

    @GetMapping("/{userId}")
    public Cart getCart(
            @PathVariable Long userId) {

        return cartService
                .getCart(userId);
    }
    
    @PutMapping("/update/{cartItemId}")
    public Cart updateQuantity(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {

        return cartService.updateQuantity(
                cartItemId,
                quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public Cart removeItem(
            @PathVariable Long cartItemId) {

        return cartService.removeItem(
                cartItemId);
    }

    @GetMapping("/total/{userId}")
    public Double calculateTotal(
            @PathVariable Long userId) {

        return cartService.calculateTotal(
                userId);
    }
}