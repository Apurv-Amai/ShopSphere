package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.User;
import com.ecommerce.exception.EmailAlreadyExistsException;
import com.ecommerce.exception.UserNotFoundException;
import com.ecommerce.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User registerUser(User user) {

		if (userRepository.findByEmail(user.getEmail()).isPresent()) {

			throw new EmailAlreadyExistsException("Email Already Registered");
		}

		user.setRole(Role.ROLE_USER);

		user.setPassword(passwordEncoder.encode(user.getPassword()));

		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {

		return userRepository.findAll();
	}

	@Override
	public User getUserById(Long userId) {

		return userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User Not Found With Id : " + userId));
	}

	@Override
	public void deleteUser(Long userId) {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User Not Found With Id : " + userId));

		userRepository.delete(user);
	}

	@Override
	public User getUserByEmail(String email) {

		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("User Not Found With Email : " + email));
	}
}