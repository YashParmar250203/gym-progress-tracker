package com.gym.workout.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class CacheEvictionService {

    private final RedisTemplate<String, Object> redisTemplate;

    // Deletes all analytics cache entries for a user
    // Pattern: "analytics::user@gmail.com:*"
    // Matches: "analytics::user@gmail.com:BENCH_PRESS"
    //          "analytics::user@gmail.com:SQUAT"
    //          "analytics::user@gmail.com:DEADLIFT" etc.
    public void evictUserAnalytics(String userEmail) {
        String pattern = "analytics::" + userEmail + ":*";
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}