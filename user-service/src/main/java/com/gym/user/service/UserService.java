package com.gym.user.service;

import com.gym.user.dto.RegisterRequestDto;
import com.gym.user.dto.RegisterResponseDto;
import com.gym.user.entity.User;
import com.gym.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegisterResponseDto registerUser(RegisterRequestDto requestDto){
        try {
            RegisterResponseDto responseDto = new RegisterResponseDto();
            if(userExistsByEmail(requestDto.getEmail())){
                responseDto.setMessage("Email already registered!");
                return responseDto;
            }

            User user  = toEntity(requestDto);
            userRepository.save(user);
            responseDto.setMessage("Email registered successfully!");
            return responseDto;
        }catch (Exception e){
            throw new RuntimeException("Something went wrong while registering user! " + e);
        }
    }

    private User toEntity(RegisterRequestDto requestDto) {
        try{
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
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public boolean userExistsByEmail(String email){
        return userRepository.existsByEmail(email);
    }
}
