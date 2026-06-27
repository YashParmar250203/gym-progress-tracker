package com.gym.user.controller;

import com.gym.user.dto.UserResponseDto;
import com.gym.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/me")
    public UserResponseDto getCurrentUser(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        return userService.getCurrentUser(token);
    }
}
