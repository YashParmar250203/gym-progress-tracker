package com.gym.workout.controller;

import com.gym.workout.dto.WorkoutResponseDto;
import com.gym.workout.enums.Exercise;
import com.gym.workout.security.SecurityUtils;
import com.gym.workout.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internal/workout")
public class InternalWorkoutController {

    private final WorkoutService workoutService;

    private final SecurityUtils securityUtils;

    public InternalWorkoutController(WorkoutService workoutService, SecurityUtils securityUtils) {
        this.workoutService = workoutService;
        this.securityUtils = securityUtils;
    }

    @GetMapping("/history")
    public ResponseEntity<List<WorkoutResponseDto>> getWorkoutHistory(@RequestParam String userEmail){

        List<WorkoutResponseDto> responseDtoList = workoutService.getWorkoutHistory(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseDtoList);
    }

    @GetMapping("/{exercise}")
    public ResponseEntity<List<WorkoutResponseDto>> getWorkoutsByExercise(@PathVariable Exercise exercise, @RequestParam String userEmail){

        List<WorkoutResponseDto> responseList = workoutService.getWorkoutsByExercise(exercise, userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }
}
