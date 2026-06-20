package com.gym.workout.dto;

import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddWorkoutRequestDto {

    @NotNull
    private MuscleGroup muscleGroup;

    @NotNull
    private Exercise exercise;

    @NotNull
    private LocalDate workoutDate;

    @NotEmpty
    private List<SetDto> sets;
}
