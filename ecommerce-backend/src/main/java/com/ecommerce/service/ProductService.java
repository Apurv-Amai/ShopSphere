package com.ecommerce.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ecommerce.entity.Product;

public interface ProductService {

    Product addProduct(Product product,
                       Long categoryId);

    List<Product> getAllProducts();

    Product getProductById(Long productId);

    void deleteProduct(Long productId);
    
    Product updateProduct(Long productId, Product product);
    
    List<Product> searchProducts(String keyword);
    
    Page<Product> getProducts(int page, int size);
    
    List<Product> getProductsSorted(
            String field);
}