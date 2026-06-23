package com.gym.analytics.service;

import com.gym.analytics.client.WorkoutServiceClient;
import com.gym.analytics.dto.AnalyticsResponseDto;
import com.gym.analytics.dto.WorkoutResponseDto;
import com.gym.analytics.enums.Exercise;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class AnalyticsService {

    private final WorkoutServiceClient workoutServiceClient;

    public AnalyticsService(WorkoutServiceClient workoutServiceClient){
        this.workoutServiceClient = workoutServiceClient;
    }

    public AnalyticsResponseDto getExerciseAnalytics(Exercise exercise, String userEmail) {
        List<WorkoutResponseDto> workouts  = workoutServiceClient.getWorkoutsByExercise(exercise, userEmail);

        workouts.sort(
                Comparator.comparing(
                        WorkoutResponseDto::getWorkoutDate
                )
        );

        return null;
    }
}
