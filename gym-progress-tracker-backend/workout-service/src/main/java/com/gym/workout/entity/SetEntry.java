package com.gym.workout.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class SetEntry {

    private Integer setNumber;

    private Double weight;

    private Integer reps;
}
