package com.gym.workout.entity;

import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "workout_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndex(
        name = "user_exercise_date_idx",
        def = "{'userEmail':1,'exercise':1,'workoutDate':1}",
        unique = true
)
public class WorkoutEntry {

    @Id
    private String id;

    private String userEmail;

    private MuscleGroup muscleGroup;

    private Exercise exercise;

    private LocalDate workoutDate;

    private List<SetEntry> sets;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}