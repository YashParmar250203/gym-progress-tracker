package com.gym.workout.controller;

import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import com.gym.workout.service.ExerciseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService){
        this.exerciseService = exerciseService;
    }

    @GetMapping("/muscle-groups")
    public ResponseEntity<List<String>> getAllMuscleGroups() {
        List<String> list = exerciseService.getAllMuscleGroups();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/muscle-group/{muscleGroup}")
    public ResponseEntity<List<String>> getExercisesByMuscleGroup(@PathVariable MuscleGroup muscleGroup) {
        List<String> list = exerciseService.getExercisesByMuscleGroup(muscleGroup);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}
