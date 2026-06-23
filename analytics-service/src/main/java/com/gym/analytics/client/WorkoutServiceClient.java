package com.gym.analytics.client;

import com.gym.analytics.dto.WorkoutResponseDto;
import com.gym.analytics.enums.Exercise;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "WORKOUT-SERVICE")
public interface WorkoutServiceClient {

    @GetMapping("/internal/workout/history")
    List<WorkoutResponseDto> getWorkoutHistory(
            @RequestParam String userEmail
    );

    @GetMapping("/internal/workout/{exercise}")
    List<WorkoutResponseDto> getWorkoutsByExercise(
            @PathVariable Exercise exercise,
            @RequestParam String userEmail
    );
}