// enums/Exercise.java

package com.gym.analytics.enums;

import com.gym.workout.enums.MuscleGroup;

public enum Exercise {

    // ───── CHEST ─────
    BENCH_PRESS("Bench Press", MuscleGroup.CHEST),
    INCLINE_BENCH_PRESS("Incline Bench Press", MuscleGroup.CHEST),
    DECLINE_BENCH_PRESS("Decline Bench Press", MuscleGroup.CHEST),
    DUMBBELL_CHEST_PRESS("Dumbbell Chest Press", MuscleGroup.CHEST),
    PUSH_UPS("Push-Ups", MuscleGroup.CHEST),
    CHEST_DIPS("Chest Dips", MuscleGroup.CHEST),
    CABLE_FLYS("Cable Flys", MuscleGroup.CHEST),
    PEC_DECK_MACHINE("Pec Deck Machine", MuscleGroup.CHEST),
    DUMBBELL_PULLOVER("Dumbbell Pullover", MuscleGroup.CHEST),

    // ───── BACK ─────
    PULL_UPS("Pull-Ups", MuscleGroup.BACK),
    CHIN_UPS("Chin-Ups", MuscleGroup.BACK),
    BARBELL_BENT_OVER_ROW("Barbell Bent-Over Row", MuscleGroup.BACK),
    DUMBBELL_ROW("Dumbbell Row", MuscleGroup.BACK),
    DEADLIFT("Deadlift", MuscleGroup.BACK),
    T_BAR_ROW("T-Bar Row", MuscleGroup.BACK),
    SEATED_CABLE_ROW("Seated Cable Row", MuscleGroup.BACK),
    LAT_PULLDOWN("Lat Pulldown", MuscleGroup.BACK),
    REVERSE_FLYS("Reverse Flys", MuscleGroup.BACK),

    // ───── SHOULDERS ─────
    OVERHEAD_PRESS("Overhead Press", MuscleGroup.SHOULDERS),
    DUMBBELL_SHOULDER_PRESS("Dumbbell Shoulder Press", MuscleGroup.SHOULDERS),
    ARNOLD_PRESS("Arnold Press", MuscleGroup.SHOULDERS),
    LATERAL_RAISE("Lateral Raise", MuscleGroup.SHOULDERS),
    FRONT_RAISE("Front Raise", MuscleGroup.SHOULDERS),
    REAR_DELT_FLY("Rear Delt Fly", MuscleGroup.SHOULDERS),
    FACE_PULL("Face Pull", MuscleGroup.SHOULDERS),
    SHRUGS("Shrugs", MuscleGroup.SHOULDERS),

    // ───── BICEPS ─────
    BARBELL_CURL("Barbell Curl", MuscleGroup.BICEPS),
    DUMBBELL_CURL("Dumbbell Curl", MuscleGroup.BICEPS),
    HAMMER_CURL("Hammer Curl", MuscleGroup.BICEPS),
    PREACHER_CURL("Preacher Curl", MuscleGroup.BICEPS),
    CONCENTRATION_CURL("Concentration Curl", MuscleGroup.BICEPS),

    // ───── TRICEPS ─────
    TRICEP_PUSHDOWN("Tricep Pushdown", MuscleGroup.TRICEPS),
    SKULL_CRUSHERS("Skull Crushers", MuscleGroup.TRICEPS),
    OVERHEAD_TRICEP_EXTENSION("Overhead Tricep Extension", MuscleGroup.TRICEPS),
    CLOSE_GRIP_BENCH_PRESS("Close Grip Bench Press", MuscleGroup.TRICEPS),
    TRICEP_DIPS("Tricep Dips", MuscleGroup.TRICEPS),

    // ───── LEGS (Quads, Hamstrings, Glutes, Calves) ─────
    SQUAT("Squat", MuscleGroup.LEGS),
    FRONT_SQUAT("Front Squat", MuscleGroup.LEGS),
    LEG_PRESS("Leg Press", MuscleGroup.LEGS),
    LUNGES("Lunges", MuscleGroup.LEGS),
    BULGARIAN_SPLIT_SQUAT("Bulgarian Split Squat", MuscleGroup.LEGS),
    GOBLET_SQUAT("Goblet Squat", MuscleGroup.LEGS),
    LEG_EXTENSION("Leg Extension", MuscleGroup.LEGS),
    ROMANIAN_DEADLIFT("Romanian Deadlift", MuscleGroup.LEGS),
    LEG_CURL("Leg Curl", MuscleGroup.LEGS),
    GOOD_MORNING("Good Morning", MuscleGroup.LEGS),
    HIP_THRUST("Hip Thrust", MuscleGroup.LEGS),
    GLUTE_BRIDGE("Glute Bridge", MuscleGroup.LEGS),
    KETTLEBELL_SWING("Kettlebell Swing", MuscleGroup.LEGS),
    STANDING_CALF_RAISE("Standing Calf Raise", MuscleGroup.LEGS),
    SEATED_CALF_RAISE("Seated Calf Raise", MuscleGroup.LEGS),

    // ───── ABS ─────
    PLANK("Plank", MuscleGroup.ABS),
    CRUNCHES("Crunches", MuscleGroup.ABS),
    SIT_UPS("Sit-Ups", MuscleGroup.ABS),
    RUSSIAN_TWIST("Russian Twist", MuscleGroup.ABS),
    HANGING_LEG_RAISE("Hanging Leg Raise", MuscleGroup.ABS),
    CABLE_CRUNCH("Cable Crunch", MuscleGroup.ABS),
    MOUNTAIN_CLIMBERS("Mountain Climbers", MuscleGroup.ABS),

    // ───── FOREARMS ─────
    WRIST_CURL("Wrist Curl", MuscleGroup.FOREARMS),
    REVERSE_WRIST_CURL("Reverse Wrist Curl", MuscleGroup.FOREARMS),
    FARMER_CARRY("Farmer Carry", MuscleGroup.FOREARMS),
    REVERSE_CURL("Reverse Curl", MuscleGroup.FOREARMS),
    PLATE_PINCH("Plate Pinch", MuscleGroup.FOREARMS);

    private final String displayName;
    private final MuscleGroup muscleGroup;

    Exercise(String displayName, MuscleGroup muscleGroup) {
        this.displayName = displayName;
        this.muscleGroup = muscleGroup;
    }

    public String getDisplayName() {
        return displayName;
    }

    public MuscleGroup getMuscleGroup() {
        return muscleGroup;
    }
}