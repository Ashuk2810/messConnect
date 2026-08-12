package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.cdac.dto.ForgotPasswordRequest;
import com.cdac.dto.LoginRequest;
import com.cdac.dto.LoginResponse;
import com.cdac.dto.ResetPasswordRequest;
import com.cdac.dto.UserProfileResponse;
import com.cdac.dto.UserRegistrationRequest;
import com.cdac.dto.UserRegistrationResponse;
import com.cdac.dto.VerifyOtpRequest;
import com.cdac.enums.UserStatus;
import com.cdac.service.OtpService;
import com.cdac.service.UserService;
import com.cdac.dto.UserProfileUpdateRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OtpService otpService;

    @PostMapping("/register")
    public UserRegistrationResponse registerUser(
            @RequestBody UserRegistrationRequest request) {

        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest loginRequest) {

        return userService.login(loginRequest);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        otpService.sendOtp(request.getUserCode());

        return "OTP has been sent successfully";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        otpService.verifyOtp(
                request.getUserCode(),
                request.getOtp());

        return "OTP verified successfully";
    }

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request) {

        otpService.resetPassword(
                request.getUserCode(),
                request.getNewPassword());

        return "Password reset successfully";
    }

    @GetMapping("/profile")
    public UserProfileResponse profile(
            Authentication authentication) {

        return userService.getProfile(
                authentication.getName());
    }
    
    @PutMapping("/profile")
    public UserProfileResponse updateMyProfile(
            Authentication authentication,
            @RequestBody UserProfileUpdateRequest request) {

        return userService.updateMyProfile(
                authentication.getName(),
                request);
    }

    @GetMapping("/test")
    public String userTest() {

        return "Welcome User";
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'BILLING_STAFF')")
    public List<UserProfileResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @PutMapping("/{userId}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String updateUserStatus(
            @PathVariable Long userId,
            @RequestParam UserStatus status) {

        userService.updateUserStatus(
                userId,
                status);

        return "User status has been updated successfully";
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String updateUser(
            @PathVariable Long userId,
            @RequestBody UserRegistrationRequest request) {

        userService.updateUser(
                userId,
                request);

        return "User has been updated successfully";
    }
}