package com.gym.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsResponseDto {

    private String exercise;

    private Double startingWeight;

    private Double currentWeight;

    private Double maxWeight;

    private Integer totalWorkouts;

    private List<ProgressPointDto> progress;
}