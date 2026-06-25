package com.ecommerce.service;

import java.util.List;

import com.ecommerce.entity.User;

public interface UserService {

	User registerUser(User user);

	List<User> getAllUsers();

	User getUserById(Long userId);

	void deleteUser(Long userId);

	User getUserByEmail(String email);

}
