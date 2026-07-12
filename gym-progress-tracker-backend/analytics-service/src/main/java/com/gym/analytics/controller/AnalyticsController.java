package com.gym.analytics.controller;

import com.gym.analytics.dto.AnalyticsResponseDto;
import com.gym.analytics.enums.Exercise;
import com.gym.analytics.security.SecurityUtils;
import com.gym.analytics.service.AnalyticsService;
import jakarta.ws.rs.Path;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    private final SecurityUtils securityUtils;

    public AnalyticsController(AnalyticsService analyticsService, SecurityUtils securityUtils){
        this.analyticsService = analyticsService;
        this.securityUtils = securityUtils;
    }


    @GetMapping("/exercise/{exercise}")
    public ResponseEntity<AnalyticsResponseDto> getExerciseAnalytics(@PathVariable Exercise exercise){
        String userEmail = securityUtils.getCurrentUserEmail();

        AnalyticsResponseDto responseDto = analyticsService.getExerciseAnalytics(exercise, userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
