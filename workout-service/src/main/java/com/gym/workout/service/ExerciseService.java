package com.gym.workout.service;

import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ExerciseService {
    public List<MuscleGroup> getAllMuscleGroups() {
        return Arrays.stream(MuscleGroup.values()).toList();
    }

    public List<Exercise> getExercisesByMuscleGroup(MuscleGroup muscleGroup) {
        return Arrays.stream(Exercise.values())
                .filter(e -> e.getMuscleGroup() == muscleGroup).toList();
    }
}
