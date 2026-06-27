package com.gym.workout.service;

import com.gym.workout.dto.AddWorkoutRequestDto;
import com.gym.workout.dto.AddWorkoutResponseDto;
import com.gym.workout.dto.SetDto;
import com.gym.workout.dto.WorkoutResponseDto;
import com.gym.workout.entity.SetEntry;
import com.gym.workout.entity.WorkoutEntry;
import com.gym.workout.enums.Exercise;
import com.gym.workout.enums.MuscleGroup;
import com.gym.workout.exception.UnauthorizedAccessException;
import com.gym.workout.exception.WorkoutNotFoundException;
import com.gym.workout.repository.WorkoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
                workoutRepository.findByUserEmailAndExerciseAndWorkoutDate(
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
                    workout.getExercise().getDisplayName(),
                    workout.getWorkoutDate()
            );
        }

        WorkoutEntry workout = buildWorkoutEntry(requestDto, userEmail);

        workoutRepository.save(workout);

        return new AddWorkoutResponseDto(
                "Workout added successfully",
                workout.getExercise().getDisplayName(),
                workout.getWorkoutDate()
        );
    }

    private WorkoutEntry buildWorkoutEntry(
            AddWorkoutRequestDto requestDto,
            String userEmail
    ) {

        List<SetEntry> sets = new ArrayList<>(
                requestDto.getSets()
                        .stream()
                        .map(dto -> new SetEntry(
                                dto.getSetNumber(),
                                dto.getWeight(),
                                dto.getReps()
                        ))
                        .toList()
        );

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

    public AddWorkoutResponseDto updateWorkout(AddWorkoutRequestDto requestDto, String id, String userEmail) {

        WorkoutEntry oldEntry = workoutRepository.findById(id)
                .orElseThrow(() -> new WorkoutNotFoundException("Workout not found!"));

        if (!oldEntry.getUserEmail().equals(userEmail)) {
            throw new UnauthorizedAccessException("You are not allowed to modify this workout.");
        }

        WorkoutEntry updatedWorkout = buildWorkoutEntry(requestDto, oldEntry.getUserEmail());
        updatedWorkout.setUpdatedAt(LocalDateTime.now());
        updatedWorkout.setCreatedAt(oldEntry.getCreatedAt());
        updatedWorkout.setId(oldEntry.getId());
        workoutRepository.save(updatedWorkout);

        return new AddWorkoutResponseDto(
                "Workout updated successfully.",
                updatedWorkout.getExercise().getDisplayName(),
                updatedWorkout.getWorkoutDate()
        );
    }

    public void deleteWorkout(String id, String userEmail) {

        WorkoutEntry workoutEntry = workoutRepository.findById(id)
                .orElseThrow(() -> new WorkoutNotFoundException("Workout not found."));

        if (!workoutEntry.getUserEmail().equals(userEmail)) {
            throw new UnauthorizedAccessException("You are not allowed to delete this workout.");
        }

        workoutRepository.deleteById(id);
    }

    // service
    public List<WorkoutResponseDto> getWorkoutsByExercise(Exercise exercise, String email) {
        List<WorkoutEntry> list = workoutRepository.findByUserEmailAndExercise(email, exercise);
        return list.stream().map(this::toDto).toList();
    }

    private WorkoutResponseDto toDto(WorkoutEntry workoutEntry) {

        WorkoutResponseDto dto = new WorkoutResponseDto();
        dto.setId(workoutEntry.getId());
        dto.setMuscleGroup(workoutEntry.getMuscleGroup());
        dto.setExercise(workoutEntry.getExercise());
        dto.setWorkoutDate(workoutEntry.getWorkoutDate());
        dto.setCreatedAt(workoutEntry.getCreatedAt());
        dto.setUpdatedAt(workoutEntry.getUpdatedAt());
        dto.setSets(new ArrayList<>());

        for(SetEntry setEntry : workoutEntry.getSets()){
            dto.getSets().add(
                    new SetDto(
                            setEntry.getSetNumber(),
                            setEntry.getWeight(),
                            setEntry.getReps()
                    )
            );
        }

        return dto;
    }

    public List<WorkoutResponseDto> getWorkoutHistory(String userEmail) {
        List<WorkoutEntry> list = workoutRepository.findByUserEmailOrderByWorkoutDateDesc(userEmail);
        return list.stream().map(this::toDto).toList();
    }

    public List<WorkoutResponseDto> getTodayWorkout(String userEmail) {
        List<WorkoutEntry> list = workoutRepository.findByUserEmailAndWorkoutDate(userEmail, LocalDate.now());
        return list.stream().map(this::toDto).toList();
    }

    public WorkoutResponseDto getWorkoutById(String userEmail, String id) {
        WorkoutEntry entry = workoutRepository.findByUserEmailAndId(userEmail, id)
                .orElseThrow(() -> new WorkoutNotFoundException("Workout not found."));

        return toDto(entry);
    }

    public List<WorkoutResponseDto> getMuscleGroupWorkouts(String userEmail, MuscleGroup muscleGroup) {
        List<WorkoutEntry> workoutEntries = workoutRepository.findByUserEmailAndMuscleGroupOrderByWorkoutDateDesc(userEmail, muscleGroup);
        return workoutEntries.stream().map(this::toDto).toList();
    }
}