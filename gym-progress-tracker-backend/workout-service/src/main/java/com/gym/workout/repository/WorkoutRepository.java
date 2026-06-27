package com.gym.workout.repository;

import com.gym.workout.entity.WorkoutEntry;
import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutRepository extends MongoRepository<WorkoutEntry, String> {

    List<WorkoutEntry> findByUserEmail(String userEmail);

    List<WorkoutEntry> findByUserEmailOrderByWorkoutDateDesc(
            String userEmail
    );

    List<WorkoutEntry> findByUserEmailAndWorkoutDate(
            String userEmail,
            LocalDate workoutDate
    );

    List<WorkoutEntry> findByUserEmailAndExercise(
            String userEmail,
            Exercise exercise
    );

    Optional<WorkoutEntry> findByUserEmailAndExerciseAndWorkoutDate(
            String userEmail,
            Exercise exercise,
            LocalDate workoutDate
    );

    List<WorkoutEntry> findByUserEmailAndMuscleGroupOrderByWorkoutDateDesc(
            String userEmail,
            MuscleGroup muscleGroup
    );

    Optional<WorkoutEntry> findByUserEmailAndId(String userEmail, String id);

    Optional<List<WorkoutEntry>> findByUserEmailAndWorkoutDateOrderByCreatedAt(String userEmail, LocalDate workoutDate);
}