package com.gym.user.dto;

import com.gym.user.enums.FitnessGoal;
import com.gym.user.enums.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 50)
    private String password;

    @NotBlank
    @Size(min = 2, max = 100)
    private String fullName;

    @NotNull
    @Positive
    private Double height;

    @NotNull
    @Positive
    private Double weight;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    private FitnessGoal fitnessGoal;

    @NotNull
    private Gender gender;
}
