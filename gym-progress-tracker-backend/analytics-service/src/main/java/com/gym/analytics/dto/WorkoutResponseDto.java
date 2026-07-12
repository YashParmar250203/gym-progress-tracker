package com.gym.analytics.dto;

import com.gym.analytics.enums.Exercise;
import com.gym.analytics.enums.MuscleGroup;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class WorkoutResponseDto implements Serializable {

    private String id;

    private MuscleGroup muscleGroup;

    private Exercise exercise;

    private LocalDate workoutDate;

    private List<SetDto> sets;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}