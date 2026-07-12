package com.gym.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressPointDto implements Serializable {

    private LocalDate date;

    private Double maxWeight;
}