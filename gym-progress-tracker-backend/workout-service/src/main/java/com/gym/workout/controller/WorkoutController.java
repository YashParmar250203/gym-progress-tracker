package com.gym.workout.controller;

import com.gym.workout.dto.*;
import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import com.gym.workout.security.SecurityUtils;
import com.gym.workout.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/workout")
public class WorkoutController {

    private final WorkoutService workoutService;

    private final SecurityUtils securityUtils;

    public WorkoutController(WorkoutService workoutService, SecurityUtils securityUtils) {
        this.workoutService = workoutService;
        this.securityUtils = securityUtils;
    }

    @PostMapping
    public ResponseEntity<AddWorkoutResponseDto> saveWorkout(
            @Valid @RequestBody AddWorkoutRequestDto requestDto
    ) {

        String userEmail =
                securityUtils.getCurrentUserEmail();

        AddWorkoutResponseDto response =
                workoutService.saveWorkout(requestDto, userEmail);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutResponseDto> getWorkoutById(@PathVariable String id){
        String userEmail =
                securityUtils.getCurrentUserEmail();

        WorkoutResponseDto responseDto = workoutService.getWorkoutById(userEmail, id);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddWorkoutResponseDto> updateWorkout(
            @Valid @RequestBody AddWorkoutRequestDto requestDto, @PathVariable String id
    ) {


        String userEmail =
                securityUtils.getCurrentUserEmail();
        AddWorkoutResponseDto response =
                workoutService.updateWorkout(requestDto, id, userEmail);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SingleMessageResponseDto> deleteWorkout(@PathVariable String id){
        String userEmail =
                securityUtils.getCurrentUserEmail();
        workoutService.deleteWorkout(id, userEmail);

        SingleMessageResponseDto response = new SingleMessageResponseDto("Workout deleted successfully.");
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/exercise/{exercise}")
    public ResponseEntity<List<WorkoutResponseDto>> getWorkoutsByExercise(@PathVariable Exercise exercise){
        String userEmail =
                securityUtils.getCurrentUserEmail();

        List<WorkoutResponseDto> responseList = workoutService.getWorkoutsByExercise(exercise, userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }

    @GetMapping("/history")
    public ResponseEntity<List<WorkoutResponseDto>> getWorkoutHistory(){
        String userEmail =
                securityUtils.getCurrentUserEmail();

        List<WorkoutResponseDto> responseDtoList = workoutService.getWorkoutHistory(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseDtoList);
    }

    @GetMapping("/today")
    public ResponseEntity<List<WorkoutResponseDto>> getTodayWorkout(){
        String userEmail =
                securityUtils.getCurrentUserEmail();

        List<WorkoutResponseDto> responseDtoList = workoutService.getTodayWorkout(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseDtoList);
    }

    @GetMapping("/muscle-group/{muscleGroup}")
    public ResponseEntity<List<WorkoutResponseDto>> getMuscleGroupWorkouts(@PathVariable MuscleGroup muscleGroup){
        String userEmail =
                securityUtils.getCurrentUserEmail();

        List<WorkoutResponseDto> responseDtoList = workoutService.getMuscleGroupWorkouts(userEmail, muscleGroup);

        return ResponseEntity.status(HttpStatus.OK).body(responseDtoList);
    }

    @GetMapping("/date")
    public ResponseEntity<List<WorkoutResponseDto>> getWorkoutsByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate workoutDate
    ) {
        String userEmail =
                securityUtils.getCurrentUserEmail();

        List<WorkoutResponseDto> responseList =
                workoutService.getWorkoutsByDate(workoutDate, userEmail);

        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/summary")
    public ResponseEntity<List<WorkoutSummaryDto>> getWorkoutSummary() {
        String userEmail =
                securityUtils.getCurrentUserEmail();

        List<WorkoutSummaryDto> summary =
                workoutService.getWorkoutSummary(userEmail);

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDto> getDashboard() {
        String userEmail = securityUtils.getCurrentUserEmail();
        DashboardResponseDto response = workoutService.getDashboard(userEmail);
        return ResponseEntity.ok(response);
    }
}