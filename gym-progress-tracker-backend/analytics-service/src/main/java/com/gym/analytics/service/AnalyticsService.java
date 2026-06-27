package com.gym.analytics.service;

import com.gym.analytics.client.WorkoutServiceClient;
import com.gym.analytics.dto.AnalyticsResponseDto;
import com.gym.analytics.dto.ProgressPointDto;
import com.gym.analytics.dto.SetDto;
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

        List<ProgressPointDto> progress = workouts.stream()
                .map(workout -> {
                    double dailyMaxWeight = workout.getSets()
                            .stream()
                            .mapToDouble(SetDto::getWeight)
                            .max()
                            .orElse(0.0);

                    return new ProgressPointDto(
                            workout.getWorkoutDate(),
                            dailyMaxWeight
                    );
                })
                .toList();

        // first workout's max weight
        double startingWeight = progress.get(0).getMaxWeight();

        // last workout's max weight
        double currentWeight = progress.get(progress.size() - 1).getMaxWeight();

        // highest max weight ever across all sessions
        double maxWeight = progress.stream()
                .mapToDouble(ProgressPointDto::getMaxWeight)
                .max()
                .orElse(0.0);

        // total number of workout sessions for this exercise
        int totalWorkouts = progress.size();

        return new AnalyticsResponseDto(
                exercise.name(),
                startingWeight,
                currentWeight,
                maxWeight,
                totalWorkouts,
                progress
        );
    }
}
