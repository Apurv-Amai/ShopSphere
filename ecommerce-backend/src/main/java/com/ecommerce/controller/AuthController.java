package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.dto.AuthResponse;
import com.ecommerce.dto.LoginRequest;
import com.ecommerce.entity.User;
import com.ecommerce.exception.InvalidCredentialsException;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        User user =
                userRepository.findByEmail(
                                request.getEmail())
                        .orElseThrow(() ->
                                new InvalidCredentialsException(
                                        "Invalid Credentials"));

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!matches) {

            throw new InvalidCredentialsException(
                    "Invalid Credentials");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail());

        return new AuthResponse(token);
    }
}