package com.gym.workout.service;

import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ExerciseService {

    // Cache key: "muscleGroups::all"
    // First call  → runs the method, stores result in Redis
    // Later calls → returns from Redis, method never runs
    @Cacheable(value = "muscleGroups", key = "'all'")
    public List<String> getAllMuscleGroups() {
        return Arrays.stream(MuscleGroup.values())
                .map(MuscleGroup::name)
                .toList();
    }

    @Cacheable(value = "exercisesByMuscleGroup", key = "#muscleGroup.name()")
    public List<String> getExercisesByMuscleGroup(MuscleGroup muscleGroup) {
        return Arrays.stream(Exercise.values())
                .filter(e -> e.getMuscleGroup() == muscleGroup)
                .map(Exercise::name)
                .toList();
    }
}