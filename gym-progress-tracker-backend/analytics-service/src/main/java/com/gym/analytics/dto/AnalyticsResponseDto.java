package com.gym.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsResponseDto implements Serializable {

    private String exercise;

    private Double startingWeight;

    private Double currentWeight;

    private Double maxWeight;

    private Integer totalWorkouts;

    private List<ProgressPointDto> progress;
}