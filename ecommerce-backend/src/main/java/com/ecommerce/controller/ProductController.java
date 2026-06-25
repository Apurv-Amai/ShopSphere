package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.entity.Product;
import com.ecommerce.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/{categoryId}")
    public Product addProduct(
            @Valid @RequestBody Product product,
            @PathVariable Long categoryId) {

        return productService.addProduct(
                product,
                categoryId);
    }
    
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService.updateProduct(
                id,
                product);
    }

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product Deleted Successfully";
    }
    
    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam String keyword) {

        return productService
                .searchProducts(keyword);
    }
    
    @GetMapping("/page")
    public Page<Product> getProducts(
            @RequestParam int page,
            @RequestParam int size) {

        return productService.getProducts(
                page,
                size);
    }
    
    @GetMapping("/sort")
    public List<Product> getProductsSorted(
            @RequestParam String field) {

        return productService
                .getProductsSorted(field);
    }
}