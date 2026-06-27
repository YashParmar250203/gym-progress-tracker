package com.gym.workout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSummaryDto {

    @Field("_id")                    // maps MongoDB _id → workoutDate
    private LocalDate workoutDate;

    private long totalExercises;
}