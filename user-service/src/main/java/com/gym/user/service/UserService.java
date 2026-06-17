package com.gym.user.service;

import com.gym.user.dto.*;
import com.gym.user.entity.User;
import com.gym.user.exception.InvalidCredentialsException;
import com.gym.user.exception.UserAlreadyExistsException;
import com.gym.user.exception.UserNotFoundException;
import com.gym.user.repository.UserRepository;
import com.gym.user.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public RegisterResponseDto registerUser(RegisterRequestDto requestDto) {

        if (userExistsByEmail(requestDto.getEmail())) {
            throw new UserAlreadyExistsException(
                    "Email already registered."
            );
        }

        RegisterResponseDto responseDto = new RegisterResponseDto();
        User user = toEntity(requestDto);
        userRepository.save(user);
        responseDto.setMessage("Email registered successfully!");
        return responseDto;

    }

    private User toEntity(RegisterRequestDto requestDto) {

        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setFullName(requestDto.getFullName());
        user.setHeight(requestDto.getHeight());
        user.setWeight(requestDto.getWeight());
        user.setDateOfBirth(requestDto.getDateOfBirth());
        user.setFitnessGoal(requestDto.getFitnessGoal());
        user.setGender(requestDto.getGender());
        // role, createdAt, isActive are set automatically by default values in entity

        return user;
    }

    private UserResponseDto toDto(User user) {

        UserResponseDto dto = new UserResponseDto();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setHeight(user.getHeight());
        dto.setWeight(user.getWeight());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setFitnessGoal(user.getFitnessGoal());
        dto.setGender(user.getGender());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setIsActive(user.getIsActive());
        // password intentionally skipped

        return dto;
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public LoginResponseDto loginUser(LoginRequestDto requestDto) {
        // 1. Find user by email
        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException(
                        "User not found with email: " + requestDto.getEmail()
                ));

        // 2. Compare raw password with stored hashed password
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponseDto("Login successful", token);
    }

    public UserResponseDto getCurrentUser(String token) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(
                        "User not found with email: " + email
                ));

        return toDto(user);

    }
}
