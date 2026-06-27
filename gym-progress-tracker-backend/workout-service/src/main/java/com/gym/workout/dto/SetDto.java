package com.gym.workout.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetDto {

    @NotNull
    @Positive
    private Integer setNumber;

    @NotNull
    @Positive
    private Double weight;

    @NotNull
    @Positive
    private Integer reps;
}
