package com.gym.workout.controller;

import com.gym.workout.dto.AddWorkoutRequestDto;
import com.gym.workout.dto.AddWorkoutResponseDto;
import com.gym.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workout")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public ResponseEntity<AddWorkoutResponseDto> saveWorkout(
            @Valid @RequestBody AddWorkoutRequestDto requestDto
    ) {

        // TODO: Replace with JWT extracted email
        String userEmail = "abc@gmail.com";

        AddWorkoutResponseDto response =
                workoutService.saveWorkout(requestDto, userEmail);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}