package com.gym.workout.controller;

import com.gym.workout.dto.AddWorkoutRequestDto;
import com.gym.workout.dto.AddWorkoutResponseDto;
import com.gym.workout.dto.SingleMessageResponseDto;
import com.gym.workout.dto.WorkoutResponseDto;
import com.gym.workout.entity.WorkoutEntry;
import com.gym.workout.enums.Exercise;
import com.gym.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        String userEmail = "john.doe@example.com";

        AddWorkoutResponseDto response =
                workoutService.saveWorkout(requestDto, userEmail);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AddWorkoutResponseDto> updateWorkout(
            @Valid @RequestBody AddWorkoutRequestDto requestDto, @PathVariable String id
    ) {


        String email = "abc@gmail.com";
        AddWorkoutResponseDto response =
                workoutService.updateWorkout(requestDto, id, email);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SingleMessageResponseDto> deleteWorkout(@PathVariable String id){
        String email = "abc@gmail.com";
        workoutService.deleteWorkout(id, email);

        SingleMessageResponseDto response = new SingleMessageResponseDto("Workout deleted successfully.");
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/{exercise}")
    public ResponseEntity<List<WorkoutResponseDto>> getWorkoutsByExercise(@PathVariable Exercise exercise){
        // TODO: Replace with JWT extracted email
        String userEmail = "john.doe@example.com";

        List<WorkoutResponseDto> responseList = workoutService.getWorkoutsByExercise(exercise, userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }
}