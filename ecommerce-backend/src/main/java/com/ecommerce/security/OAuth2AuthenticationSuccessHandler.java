package com.ecommerce.security;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2AuthenticationSuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oauth2User =
                (OAuth2User) authentication.getPrincipal();

        String email =
                oauth2User.getAttribute("email");

        String name =
                oauth2User.getAttribute("name");

        User user =
                userRepository.findByEmail(email)
                        .orElseGet(() -> {

                            User newUser = new User();

                            newUser.setName(name);
                            newUser.setEmail(email);

                            // Google users do not provide
                            // a password.
                            newUser.setPassword(
                                    passwordEncoder.encode(
                                            UUID.randomUUID().toString()));

                            newUser.setRole(Role.ROLE_USER);

                            return userRepository.save(newUser);
                        });

        String token =
                jwtService.generateToken(
                        user.getEmail());

        String redirectUrl =
                "http://localhost:5173/oauth2/callback#token="
                        + token;

        getRedirectStrategy().sendRedirect(
                request,
                response,
                redirectUrl);
    }
}