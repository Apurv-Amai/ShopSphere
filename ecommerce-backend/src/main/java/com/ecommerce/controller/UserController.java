package com.ecommerce.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.entity.User;
import com.ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	// Register User
	@PostMapping("/register")
	public User registerUser(@Valid @RequestBody User user) {

		return userService.registerUser(user);
	}

	@GetMapping("/profile")
	public User getProfile(Principal principal) {

		return userService.getUserByEmail(principal.getName());
	}

	// Get All Users
	@GetMapping
	public List<User> getAllUsers() {

		return userService.getAllUsers();
	}

	// Get User By Id
	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id) {

		return userService.getUserById(id);
	}

	// Delete User
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Long id) {

		userService.deleteUser(id);

		return "User Deleted Successfully";
	}
}