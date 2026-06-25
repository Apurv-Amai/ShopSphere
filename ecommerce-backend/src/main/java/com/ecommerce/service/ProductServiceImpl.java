package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.CategoryNotFoundException;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Product addProduct(Product product, Long categoryId) {

		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new CategoryNotFoundException("Category Not Found"));

		product.setCategory(category);

		return productRepository.save(product);
	}

	@Override
	public List<Product> getAllProducts() {

		return productRepository.findAll();
	}

	@Override
	public Product getProductById(Long productId) {

		return productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Product Not Found"));
	}

	@Transactional
	@Override
	public void deleteProduct(Long id) {

		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ProductNotFoundException("Product Not Found"));

		try {

			productRepository.delete(product);

			productRepository.flush();

		} catch (DataIntegrityViolationException e) {

			throw new RuntimeException("Cannot delete product because it exists in previous orders");
		}
	}

	@Transactional
	@Override
	public Product updateProduct(Long productId, Product product) {

		Product existingProduct = productRepository.findById(productId)
				.orElseThrow(() -> new ProductNotFoundException("Product Not Found"));

		existingProduct.setProductName(product.getProductName());

		existingProduct.setDescription(product.getDescription());

		existingProduct.setPrice(product.getPrice());

		existingProduct.setQuantity(product.getQuantity());

		return productRepository.save(existingProduct);
	}

	@Override
	public List<Product> searchProducts(String keyword) {

		return productRepository.findByProductNameContainingIgnoreCase(keyword);
	}

	@Override
	public Page<Product> getProducts(int page, int size) {

		return productRepository.findAll(PageRequest.of(page, size));
	}

	@Override
	public List<Product> getProductsSorted(String field) {

		return productRepository.findAll(Sort.by(field));
	}
}