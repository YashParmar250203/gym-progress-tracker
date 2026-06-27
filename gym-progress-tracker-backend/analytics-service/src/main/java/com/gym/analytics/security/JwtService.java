package com.gym.analytics.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    // 1. GENERATE TOKEN
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)                          // replaces setSubject()
                .issuedAt(new Date())                    // replaces setIssuedAt()
                .expiration(new Date(System.currentTimeMillis() + expiration)) // replaces setExpiration()
                .signWith(getSigningKey())               // no need to pass algorithm
                .compact();
    }

    // 2. EXTRACT USERNAME
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // 3. VALIDATE TOKEN
    public boolean validateToken(String token, String email) {
        System.out.println("JWT Filter Called");
        System.out.println("Token = " + token);
        System.out.println("Email = " + email);
        String extractedEmail = extractUsername(token);
        boolean isEmailMatch = extractedEmail.equals(email);
        boolean isNotExpired = !isTokenExpired(token);
        return isEmailMatch && isNotExpired;
    }

    // PRIVATE HELPERS
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()                        // replaces parserBuilder()
                .verifyWith(getSigningKey())         // replaces setSigningKey()
                .build()
                .parseSignedClaims(token)           // replaces parseClaimsJws()
                .getPayload();                      // replaces getBody()
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}