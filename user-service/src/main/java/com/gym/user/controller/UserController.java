package com.gym.user.controller;

import com.gym.user.dto.RegisterRequestDto;
import com.gym.user.dto.RegisterResponseDto;
import com.gym.user.service.UserService;
import com.netflix.discovery.converters.Auto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello from User!";
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @Valid @RequestBody RegisterRequestDto requestDto) {

        RegisterResponseDto response =
                userService.registerUser(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}
