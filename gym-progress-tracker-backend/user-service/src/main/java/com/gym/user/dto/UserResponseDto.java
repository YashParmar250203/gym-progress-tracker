
package com.gym.user.dto;

import com.gym.user.enums.FitnessGoal;
import com.gym.user.enums.Gender;
import com.gym.user.enums.Roles;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserResponseDto {

    private String userId;
    private String email;
    private String fullName;
    private Double height;
    private Double weight;
    private LocalDate dateOfBirth;
    private FitnessGoal fitnessGoal;
    private Gender gender;
    private Roles role;
    private LocalDateTime createdAt;
    private Boolean isActive;

}