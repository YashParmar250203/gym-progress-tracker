package com.gym.analytics.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetDto implements Serializable {

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
