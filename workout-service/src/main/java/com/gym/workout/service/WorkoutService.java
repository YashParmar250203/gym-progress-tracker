package com.gym.workout.service;

import com.gym.workout.dto.AddWorkoutRequestDto;
import com.gym.workout.dto.AddWorkoutResponseDto;
import com.gym.workout.dto.SetDto;
import com.gym.workout.entity.SetEntry;
import com.gym.workout.entity.WorkoutEntry;
import com.gym.workout.repository.WorkoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Transactional
    public AddWorkoutResponseDto saveWorkout(
            AddWorkoutRequestDto requestDto,
            String userEmail
    ) {

        Optional<WorkoutEntry> existingWorkout =
                workoutRepository.findByUserEmailAndExerciseNameAndWorkoutDate(
                        userEmail,
                        requestDto.getExercise(),
                        requestDto.getWorkoutDate()
                );

        if (existingWorkout.isPresent()) {

            WorkoutEntry workout = existingWorkout.get();

            int nextSetNumber = workout.getSets().size() + 1;

            for (SetDto dto : requestDto.getSets()) {
                workout.getSets().add(
                        new SetEntry(
                                nextSetNumber++,
                                dto.getWeight(),
                                dto.getReps()
                        )
                );
            }

            workout.setUpdatedAt(LocalDateTime.now());

            workoutRepository.save(workout);

            return new AddWorkoutResponseDto(
                    "Workout updated successfully",
                    workout.getExercise(),
                    workout.getWorkoutDate()
            );
        }

        WorkoutEntry workout = buildWorkoutEntry(requestDto, userEmail);

        workoutRepository.save(workout);

        return new AddWorkoutResponseDto(
                "Workout added successfully",
                workout.getExercise(),
                workout.getWorkoutDate()
        );
    }

    private WorkoutEntry buildWorkoutEntry(
            AddWorkoutRequestDto requestDto,
            String userEmail
    ) {

        List<SetEntry> sets = requestDto.getSets()
                .stream()
                .map(dto -> new SetEntry(
                        dto.getSetNumber(),
                        dto.getWeight(),
                        dto.getReps()
                ))
                .toList();

        WorkoutEntry workout = new WorkoutEntry();

        workout.setUserEmail(userEmail);
        workout.setMuscleGroup(requestDto.getMuscleGroup());
        workout.setExercise(requestDto.getExercise());
        workout.setWorkoutDate(requestDto.getWorkoutDate());
        workout.setSets(sets);
        workout.setCreatedAt(LocalDateTime.now());
        workout.setUpdatedAt(LocalDateTime.now());

        return workout;
    }
}