package com.ecommerce.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(
                secretKey.getBytes());
    }

    // Generate Token
    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtExpiration))
                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract Username
    public String extractUsername(
            String token) {

        return extractAllClaims(token)
                .getSubject();
    }

    // Extract Claims
    private Claims extractAllClaims(
            String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Validate Token
    public boolean isTokenValid(
            String token,
            String email) {

        String username =
                extractUsername(token);

        return username.equals(email);
    }
}