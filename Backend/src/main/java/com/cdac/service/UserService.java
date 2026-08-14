package com.cdac.service;

import com.cdac.dto.UserProfileUpdateRequest;

import java.util.List;
import com.cdac.enums.UserStatus;
import com.cdac.dto.LoginRequest;
import com.cdac.dto.LoginResponse;
import com.cdac.dto.UserProfileResponse;
import com.cdac.dto.UserRegistrationRequest;
import com.cdac.dto.UserRegistrationResponse;

public interface UserService {


UserRegistrationResponse registerUser(UserRegistrationRequest request);

LoginResponse login(LoginRequest loginRequest);

UserProfileResponse getProfile(String userCode);

UserProfileResponse updateMyProfile(
        String userCode,
        UserProfileUpdateRequest request);

List<UserProfileResponse> getAllUsers();

void updateUserStatus(Long userId, UserStatus status);
void updateUser(Long userId,
        UserRegistrationRequest request);
}
