package com.gym.user.entity;

import com.gym.user.enums.FitnessGoal;
import com.gym.user.enums.Gender;
import com.gym.user.enums.Roles;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Document(collection = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    private String userId;

    @Indexed(unique = true)
    private String email;

    private String password;

    private String fullName;

    private Double height;

    private Double weight;

    private LocalDate dateOfBirth;

    private FitnessGoal fitnessGoal;

    private Gender gender;

    private Roles role = Roles.REGULAR;

    private LocalDateTime createdAt = LocalDateTime.now();

    private Boolean isActive = true;
}