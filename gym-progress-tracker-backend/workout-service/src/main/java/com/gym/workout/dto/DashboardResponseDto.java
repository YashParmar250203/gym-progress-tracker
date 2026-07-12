package com.gym.workout.dto;

import java.io.Serializable;
import java.util.List;

public class DashboardResponseDto implements Serializable {

    private List<WorkoutSummaryDto> summary;
    private List<WorkoutResponseDto> workouts;

    public DashboardResponseDto() {}

    public DashboardResponseDto(List<WorkoutSummaryDto> summary, List<WorkoutResponseDto> workouts) {
        this.summary = summary;
        this.workouts = workouts;
    }

    public List<WorkoutSummaryDto> getSummary() { return summary; }
    public List<WorkoutResponseDto> getWorkouts() { return workouts; }

    public void setSummary(List<WorkoutSummaryDto> summary) { this.summary = summary; }
    public void setWorkouts(List<WorkoutResponseDto> workouts) { this.workouts = workouts; }
}