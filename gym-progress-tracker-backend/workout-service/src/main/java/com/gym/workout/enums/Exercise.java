// enums/Exercise.java

package com.gym.workout.enums;

public enum Exercise {

    // ───── CHEST ─────
    BENCH_PRESS("Bench Press", MuscleGroup.CHEST),
    INCLINE_BENCH_PRESS("Incline Bench Press", MuscleGroup.CHEST),
    DECLINE_BENCH_PRESS("Decline Bench Press", MuscleGroup.CHEST),
    DUMBBELL_CHEST_PRESS("Dumbbell Chest Press", MuscleGroup.CHEST),
    INCLINE_DUMBBELL_PRESS("Incline Dumbbell Press", MuscleGroup.CHEST),
    DECLINE_DUMBBELL_PRESS("Decline Dumbbell Press", MuscleGroup.CHEST),
    MACHINE_CHEST_PRESS("Machine Chest Press", MuscleGroup.CHEST),
    SMITH_MACHINE_BENCH_PRESS("Smith Machine Bench Press", MuscleGroup.CHEST),
    PUSH_UPS("Push-Ups", MuscleGroup.CHEST),
    WEIGHTED_PUSH_UPS("Weighted Push-Ups", MuscleGroup.CHEST),
    CHEST_DIPS("Chest Dips", MuscleGroup.CHEST),
    CABLE_FLYS("Cable Flys", MuscleGroup.CHEST),
    LOW_TO_HIGH_CABLE_FLY("Low to High Cable Fly", MuscleGroup.CHEST),
    HIGH_TO_LOW_CABLE_FLY("High to Low Cable Fly", MuscleGroup.CHEST),
    MID_CABLE_FLY("Mid Cable Fly", MuscleGroup.CHEST),
    PEC_DECK_MACHINE("Pec Deck Machine", MuscleGroup.CHEST),
    DUMBBELL_FLY("Dumbbell Fly", MuscleGroup.CHEST),
    INCLINE_DUMBBELL_FLY("Incline Dumbbell Fly", MuscleGroup.CHEST),
    DECLINE_DUMBBELL_FLY("Decline Dumbbell Fly", MuscleGroup.CHEST),
    DUMBBELL_PULLOVER("Dumbbell Pullover", MuscleGroup.CHEST),
    LANDMINE_PRESS("Landmine Press", MuscleGroup.CHEST),

    // ───── BACK ─────
    DEADLIFT("Deadlift", MuscleGroup.BACK),
    SUMO_DEADLIFT("Sumo Deadlift", MuscleGroup.BACK),
    RACK_PULL("Rack Pull", MuscleGroup.BACK),
    PULL_UPS("Pull-Ups", MuscleGroup.BACK),
    WEIGHTED_PULL_UPS("Weighted Pull-Ups", MuscleGroup.BACK),
    CHIN_UPS("Chin-Ups", MuscleGroup.BACK),
    NEUTRAL_GRIP_PULL_UP("Neutral Grip Pull-Up", MuscleGroup.BACK),
    LAT_PULLDOWN("Lat Pulldown", MuscleGroup.BACK),
    WIDE_GRIP_LAT_PULLDOWN("Wide Grip Lat Pulldown", MuscleGroup.BACK),
    REVERSE_GRIP_LAT_PULLDOWN("Reverse Grip Lat Pulldown", MuscleGroup.BACK),
    CLOSE_GRIP_LAT_PULLDOWN("Close Grip Lat Pulldown", MuscleGroup.BACK),
    STRAIGHT_ARM_PULLDOWN("Straight Arm Pulldown", MuscleGroup.BACK),
    SEATED_CABLE_ROW("Seated Cable Row", MuscleGroup.BACK),
    CLOSE_GRIP_CABLE_ROW("Close Grip Cable Row", MuscleGroup.BACK),
    BARBELL_BENT_OVER_ROW("Barbell Bent-Over Row", MuscleGroup.BACK),
    PENDLAY_ROW("Pendlay Row", MuscleGroup.BACK),
    YATES_ROW("Yates Row", MuscleGroup.BACK),
    DUMBBELL_ROW("Dumbbell Row", MuscleGroup.BACK),
    CHEST_SUPPORTED_ROW("Chest Supported Row", MuscleGroup.BACK),
    T_BAR_ROW("T-Bar Row", MuscleGroup.BACK),
    MACHINE_ROW("Machine Row", MuscleGroup.BACK),
    INVERTED_ROW("Inverted Row", MuscleGroup.BACK),
    REVERSE_FLYS("Reverse Flys", MuscleGroup.BACK),
    MEADOWS_ROW("Meadows Row", MuscleGroup.BACK),
    SINGLE_ARM_LAT_PULLDOWN("Single Arm Lat Pulldown", MuscleGroup.BACK),

    // ───── SHOULDERS ─────
    OVERHEAD_PRESS("Overhead Press", MuscleGroup.SHOULDERS),
    MILITARY_PRESS("Military Press", MuscleGroup.SHOULDERS),
    SEATED_OVERHEAD_PRESS("Seated Overhead Press", MuscleGroup.SHOULDERS),
    DUMBBELL_SHOULDER_PRESS("Dumbbell Shoulder Press", MuscleGroup.SHOULDERS),
    SEATED_DUMBBELL_PRESS("Seated Dumbbell Press", MuscleGroup.SHOULDERS),
    ARNOLD_PRESS("Arnold Press", MuscleGroup.SHOULDERS),
    LATERAL_RAISE("Lateral Raise", MuscleGroup.SHOULDERS),
    CABLE_LATERAL_RAISE("Cable Lateral Raise", MuscleGroup.SHOULDERS),
    LEANING_CABLE_LATERAL_RAISE("Leaning Cable Lateral Raise", MuscleGroup.SHOULDERS),
    MACHINE_LATERAL_RAISE("Machine Lateral Raise", MuscleGroup.SHOULDERS),
    FRONT_RAISE("Front Raise", MuscleGroup.SHOULDERS),
    CABLE_FRONT_RAISE("Cable Front Raise", MuscleGroup.SHOULDERS),
    PLATE_FRONT_RAISE("Plate Front Raise", MuscleGroup.SHOULDERS),
    REAR_DELT_FLY("Rear Delt Fly", MuscleGroup.SHOULDERS),
    REVERSE_PEC_DECK("Reverse Pec Deck", MuscleGroup.SHOULDERS),
    FACE_PULL("Face Pull", MuscleGroup.SHOULDERS),
    UPRIGHT_ROW("Upright Row", MuscleGroup.SHOULDERS),
    SHRUGS("Shrugs", MuscleGroup.SHOULDERS),
    DUMBBELL_SHRUG("Dumbbell Shrug", MuscleGroup.SHOULDERS),
    BARBELL_SHRUG("Barbell Shrug", MuscleGroup.SHOULDERS),

    // ───── BICEPS ─────
    BARBELL_CURL("Barbell Curl", MuscleGroup.BICEPS),
    EZ_BAR_CURL("EZ Bar Curl", MuscleGroup.BICEPS),
    DUMBBELL_CURL("Dumbbell Curl", MuscleGroup.BICEPS),
    ALTERNATING_DUMBBELL_CURL("Alternating Dumbbell Curl", MuscleGroup.BICEPS),
    HAMMER_CURL("Hammer Curl", MuscleGroup.BICEPS),
    ROPE_HAMMER_CURL("Rope Hammer Curl", MuscleGroup.BICEPS),
    CROSS_BODY_HAMMER_CURL("Cross Body Hammer Curl", MuscleGroup.BICEPS),
    PREACHER_CURL("Preacher Curl", MuscleGroup.BICEPS),
    MACHINE_PREACHER_CURL("Machine Preacher Curl", MuscleGroup.BICEPS),
    CONCENTRATION_CURL("Concentration Curl", MuscleGroup.BICEPS),
    INCLINE_DUMBBELL_CURL("Incline Dumbbell Curl", MuscleGroup.BICEPS),
    CABLE_CURL("Cable Curl", MuscleGroup.BICEPS),
    HIGH_CABLE_CURL("High Cable Curl", MuscleGroup.BICEPS),
    SPIDER_CURL("Spider Curl", MuscleGroup.BICEPS),
    DRAG_CURL("Drag Curl", MuscleGroup.BICEPS),

    // ───── TRICEPS ─────
    TRICEP_PUSHDOWN("Tricep Pushdown", MuscleGroup.TRICEPS),
    ROPE_PUSHDOWN("Rope Pushdown", MuscleGroup.TRICEPS),
    STRAIGHT_BAR_PUSHDOWN("Straight Bar Pushdown", MuscleGroup.TRICEPS),
    V_BAR_PUSHDOWN("V-Bar Pushdown", MuscleGroup.TRICEPS),
    SKULL_CRUSHERS("Skull Crushers", MuscleGroup.TRICEPS),
    OVERHEAD_TRICEP_EXTENSION("Overhead Tricep Extension", MuscleGroup.TRICEPS),
    CABLE_OVERHEAD_EXTENSION("Cable Overhead Extension", MuscleGroup.TRICEPS),
    DUMBBELL_OVERHEAD_EXTENSION("Dumbbell Overhead Extension", MuscleGroup.TRICEPS),
    CLOSE_GRIP_BENCH_PRESS("Close Grip Bench Press", MuscleGroup.TRICEPS),
    TRICEP_DIPS("Tricep Dips", MuscleGroup.TRICEPS),
    BENCH_DIPS("Bench Dips", MuscleGroup.TRICEPS),
    KICKBACK("Tricep Kickback", MuscleGroup.TRICEPS),
    JM_PRESS("JM Press", MuscleGroup.TRICEPS),

    // ───── LEGS ─────
    SQUAT("Squat", MuscleGroup.LEGS),
    HIGH_BAR_SQUAT("High Bar Squat", MuscleGroup.LEGS),
    LOW_BAR_SQUAT("Low Bar Squat", MuscleGroup.LEGS),
    FRONT_SQUAT("Front Squat", MuscleGroup.LEGS),
    BOX_SQUAT("Box Squat", MuscleGroup.LEGS),
    LEG_PRESS("Leg Press", MuscleGroup.LEGS),
    HACK_SQUAT("Hack Squat", MuscleGroup.LEGS),
    SMITH_MACHINE_SQUAT("Smith Machine Squat", MuscleGroup.LEGS),
    LUNGES("Lunges", MuscleGroup.LEGS),
    WALKING_LUNGES("Walking Lunges", MuscleGroup.LEGS),
    REVERSE_LUNGES("Reverse Lunges", MuscleGroup.LEGS),
    BULGARIAN_SPLIT_SQUAT("Bulgarian Split Squat", MuscleGroup.LEGS),
    STEP_UP("Step Up", MuscleGroup.LEGS),
    GOBLET_SQUAT("Goblet Squat", MuscleGroup.LEGS),
    LEG_EXTENSION("Leg Extension", MuscleGroup.LEGS),
    SISSY_SQUAT("Sissy Squat", MuscleGroup.LEGS),
    ROMANIAN_DEADLIFT("Romanian Deadlift", MuscleGroup.LEGS),
    STIFF_LEG_DEADLIFT("Stiff Leg Deadlift", MuscleGroup.LEGS),
    GOOD_MORNING("Good Morning", MuscleGroup.LEGS),
    LEG_CURL("Leg Curl", MuscleGroup.LEGS),
    LYING_LEG_CURL("Lying Leg Curl", MuscleGroup.LEGS),
    SEATED_LEG_CURL("Seated Leg Curl", MuscleGroup.LEGS),
    SINGLE_LEG_CURL("Single Leg Curl", MuscleGroup.LEGS),
    NORDIC_CURL("Nordic Curl", MuscleGroup.LEGS),
    GLUTE_HAM_RAISE("Glute Ham Raise", MuscleGroup.LEGS),
    HIP_THRUST("Hip Thrust", MuscleGroup.LEGS),
    BARBELL_HIP_THRUST("Barbell Hip Thrust", MuscleGroup.LEGS),
    GLUTE_BRIDGE("Glute Bridge", MuscleGroup.LEGS),
    CABLE_KICKBACK("Cable Kickback", MuscleGroup.LEGS),
    DONKEY_KICK("Donkey Kick", MuscleGroup.LEGS),
    KETTLEBELL_SWING("Kettlebell Swing", MuscleGroup.LEGS),
    ABDUCTOR_MACHINE("Abductor Machine", MuscleGroup.LEGS),
    ADDUCTOR_MACHINE("Adductor Machine", MuscleGroup.LEGS),
    STANDING_CALF_RAISE("Standing Calf Raise", MuscleGroup.LEGS),
    SEATED_CALF_RAISE("Seated Calf Raise", MuscleGroup.LEGS),
    DONKEY_CALF_RAISE("Donkey Calf Raise", MuscleGroup.LEGS),
    LEG_PRESS_CALF_RAISE("Leg Press Calf Raise", MuscleGroup.LEGS),
    SINGLE_LEG_CALF_RAISE("Single Leg Calf Raise", MuscleGroup.LEGS),

    // ───── ABS ─────
    PLANK("Plank", MuscleGroup.ABS),
    SIDE_PLANK("Side Plank", MuscleGroup.ABS),
    CRUNCHES("Crunches", MuscleGroup.ABS),
    DECLINE_CRUNCH("Decline Crunch", MuscleGroup.ABS),
    SIT_UPS("Sit-Ups", MuscleGroup.ABS),
    V_UP("V-Up", MuscleGroup.ABS),
    LEG_RAISE("Leg Raise", MuscleGroup.ABS),
    HANGING_LEG_RAISE("Hanging Leg Raise", MuscleGroup.ABS),
    KNEE_RAISE("Knee Raise", MuscleGroup.ABS),
    CABLE_CRUNCH("Cable Crunch", MuscleGroup.ABS),
    AB_WHEEL_ROLLOUT("Ab Wheel Rollout", MuscleGroup.ABS),
    RUSSIAN_TWIST("Russian Twist", MuscleGroup.ABS),
    BICYCLE_CRUNCH("Bicycle Crunch", MuscleGroup.ABS),
    MOUNTAIN_CLIMBERS("Mountain Climbers", MuscleGroup.ABS),
    DRAGON_FLAG("Dragon Flag", MuscleGroup.ABS),
    WOODCHOP("Wood Chop", MuscleGroup.ABS),
    TOES_TO_BAR("Toes to Bar", MuscleGroup.ABS),

    // ───── FOREARMS ─────
    WRIST_CURL("Wrist Curl", MuscleGroup.FOREARMS),
    REVERSE_WRIST_CURL("Reverse Wrist Curl", MuscleGroup.FOREARMS),
    FARMER_CARRY("Farmer Carry", MuscleGroup.FOREARMS),
    REVERSE_CURL("Reverse Curl", MuscleGroup.FOREARMS),
    PLATE_PINCH("Plate Pinch", MuscleGroup.FOREARMS),
    HAMMER_ROTATION("Hammer Rotation", MuscleGroup.FOREARMS),
    WRIST_ROLLER("Wrist Roller", MuscleGroup.FOREARMS),
    DEAD_HANG("Dead Hang", MuscleGroup.FOREARMS);

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