package com.gym.user.security;

import com.gym.user.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;   // loads user info

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // Get the "Authorization" header
        String authHeader = request.getHeader("Authorization");

        // If no header or doesn't start with "Bearer ", skip this filter
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);   // let it pass through
            return;
        }

        // Extract the actual token (remove "Bearer " prefix)
        String token = authHeader.substring(7);   // "Bearer eyJhbGci..." → "eyJhbGci..."

        // Extract email from token
        String email = jwtService.extractUsername(token);

        // Check if user is not already authenticated in this request
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

            // Validate token
            System.out.println("Token Valid = " +
                    jwtService.validateToken(token, email));
            if (jwtService.validateToken(token, userDetails.getUsername())) {

                // Create authentication object
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                // Set this user as "logged in" for this request
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            System.out.println("Authentication Set Successfully");
        }

        // Continue to next filter/controller
        filterChain.doFilter(request, response);
    }
}