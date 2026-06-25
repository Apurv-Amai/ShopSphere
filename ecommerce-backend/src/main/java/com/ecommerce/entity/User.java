package com.ecommerce.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@NotBlank(message = "Name cannot be empty")
	@Column(nullable = false)
	private String name;

	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Enter valid email")
	@Column(nullable = false, unique = true)
	private String email;

	@NotBlank(message = "Password cannot be empty")
	@Size(min = 5, message = "Password must contain at least 5 characters")
	@Column(nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToOne(mappedBy = "user")
	private Cart cart;

	@OneToMany(mappedBy = "user")
	private List<Order> orders;

	public User() {
	}

	public User(Long userId, String name, String email, String password, Role role) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	// Getters and Setters

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
}