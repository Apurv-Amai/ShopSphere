package com.ecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;

	@NotBlank(message = "Product Name cannot be empty")
	@Column(nullable = false)
	private String productName;

	private String description;

	@NotNull(message = "Price cannot be null")
    @Min(value = 1, message = "Price must be greater than 0")
	private Double price;

	@NotNull(message = "Quantity cannot be null")
    @Min(value = 0, message = "Quantity cannot be negative")
	private Integer quantity;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	public Product() {
	}

	public Product(Long productId, String productName, String description, Double price, Integer quantity,
			Category category) {

		this.productId = productId;
		this.productName = productName;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.category = category;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
}