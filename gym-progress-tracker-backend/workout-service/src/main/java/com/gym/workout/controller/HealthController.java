package com.gym.workout.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthController {

    private final RedisTemplate<String, Object> redisTemplate;

    @GetMapping("/redis")
    public Map<String, String> checkRedis() {
        try {
            redisTemplate.opsForValue().set("health:ping", "pong");
            Object value = redisTemplate.opsForValue().get("health:ping");
            return Map.of(
                    "status", "UP",
                    "response", String.valueOf(value)
            );
        } catch (Exception e) {
            return Map.of(
                    "status", "DOWN",
                    "error", e.getMessage()
            );
        }
    }
}