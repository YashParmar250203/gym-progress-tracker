package com.gym.user.controller;

import com.gym.user.dto.LoginRequestDto;
import com.gym.user.dto.LoginResponseDto;
import com.gym.user.dto.RegisterRequestDto;
import com.gym.user.dto.RegisterResponseDto;
import com.gym.user.security.JwtService;
import com.gym.user.service.UserService;
import com.netflix.discovery.converters.Auto;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

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

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> userLogin(@Valid @RequestBody LoginRequestDto requestDto){
        LoginResponseDto response = userService.loginUser(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/token-test")
    public String tokenTest(
            @RequestHeader("Authorization") String header) {

        String token = header.substring(7);

        return jwtService.extractUsername(token);
    }
}
