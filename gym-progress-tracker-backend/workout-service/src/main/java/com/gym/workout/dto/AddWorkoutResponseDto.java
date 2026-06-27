package com.gym.workout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddWorkoutResponseDto {

    private String message;

    private String exercise;

    private LocalDate workoutDate;
}
