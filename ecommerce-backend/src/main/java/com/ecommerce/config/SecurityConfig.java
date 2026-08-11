package com.ecommerce.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ecommerce.security.JwtAuthenticationFilter;
import com.ecommerce.security.OAuth2AuthenticationSuccessHandler;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173"));

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(
                List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> {
            })

            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // Public endpoints
                .requestMatchers(
                    "/users/register",
                    "/auth/login",
                    "/oauth2/**",
                    "/login/**"
                ).permitAll()

                // Logged-in USER or ADMIN
                .requestMatchers("/users/profile")
                .hasAnyRole("USER", "ADMIN")

                // ADMIN only - user management
                .requestMatchers("/users/**")
                .hasRole("ADMIN")

                // USER or ADMIN - product/category viewing
                .requestMatchers(
                    "/products",
                    "/products/search",
                    "/products/page",
                    "/products/sort",
                    "/categories"
                ).hasAnyRole("USER", "ADMIN")

                // USER only
                .requestMatchers("/cart/**")
                .hasRole("USER")

                .requestMatchers("/orders/**")
                .hasRole("USER")

                // ADMIN only - product management
                .requestMatchers("/products/**")
                .hasRole("ADMIN")

                // ADMIN only - category management
                .requestMatchers("/categories/**")
                .hasRole("ADMIN")

                .anyRequest()
                .authenticated()
            )

            .exceptionHandling(exception -> exception

                // Not authenticated → 401
                .authenticationEntryPoint(
                    new HttpStatusEntryPoint(
                        HttpStatus.UNAUTHORIZED)
                )

                // Authenticated but insufficient role → 403
                .accessDeniedHandler(
                    (request, response, accessDeniedException) -> {
                        response.setStatus(
                            HttpServletResponse.SC_FORBIDDEN);
                    }
                )
            )

            .oauth2Login(oauth2 ->
                oauth2.successHandler(
                    oAuth2AuthenticationSuccessHandler)
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}