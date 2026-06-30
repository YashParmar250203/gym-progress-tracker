package com.gym.ai.dto;

import com.gym.ai.enums.Exercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutFeedbackRequestDto {
    private Exercise exercise;
}
