package com.cdac.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.dto.LoginRequest;
import com.cdac.dto.LoginResponse;
import com.cdac.dto.UserProfileResponse;
import com.cdac.dto.UserProfileUpdateRequest;
import com.cdac.dto.UserRegistrationRequest;
import com.cdac.dto.UserRegistrationResponse;
import com.cdac.entity.User;
import com.cdac.entity.Wallet;
import com.cdac.enums.UserStatus;
import com.cdac.repository.UserRepository;
import com.cdac.repository.WalletRepository;
import com.cdac.service.EmailService;
import com.cdac.service.UserService;
import com.cdac.util.JwtUtil;
import com.cdac.util.PasswordGenerator;
import com.cdac.util.UserCodeGenerator;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserRegistrationResponse registerUser(
            UserRegistrationRequest request) {

        validateMobile(request.getMobile());

        String prefix =
                UserCodeGenerator.getPrefix(request.getUserType());

        Optional<User> lastUser =
                userRepository
                        .findTopByUserCodeStartingWithOrderByUserCodeDesc(prefix);

        int nextNumber = 1;

        if (lastUser.isPresent()) {

            String lastCode = lastUser.get().getUserCode();

            nextNumber =
                    Integer.parseInt(lastCode.substring(3)) + 1;
        }

        String userCode =
                prefix + String.format("%06d", nextNumber);

        String password =
                PasswordGenerator.generatePassword(
                        request.getFullName(),
                        userCode);

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();

        user.setUserCode(userCode);
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(request.getRole());
        user.setUserType(request.getUserType());
        user.setStatus(UserStatus.ACTIVE);
        user.setIsPasswordChanged(false);
        user.setOtpVerified(false);

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        User savedUser = userRepository.save(user);

        Wallet wallet = new Wallet();

        wallet.setBalance(0.0);
        wallet.setLowBalanceThreshold(600.0);
        wallet.setUser(savedUser);

        walletRepository.save(wallet);

        emailService.sendRegistrationEmail(
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getUserCode(),
                password);

        return new UserRegistrationResponse(
                "User Registered Successfully",
                userCode,
                password);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        Optional<User> optionalUser =
                userRepository.findByUserCode(
                        loginRequest.getUserCode());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException(
                    "Invalid User Code or Password");
        }

        User user = optionalUser.get();

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException(
                    "User Account is Inactive");
        }

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid User Code or Password");
        }

        String token =
                jwtUtil.generateToken(user.getUserCode());

        LoginResponse response = new LoginResponse();

        response.setUserId(user.getUserId());
        response.setUserCode(user.getUserCode());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole());
        response.setUserType(user.getUserType());
        response.setIsPasswordChanged(
                user.getIsPasswordChanged());
        response.setToken(token);
        response.setMessage("Login Successful");

        return response;
    }

    @Override
    public UserProfileResponse getProfile(String userCode) {

        User user =
                userRepository.findByUserCode(userCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        return mapToProfileResponse(user);
    }

    // Update logged-in user's own profile
    @Override
    public UserProfileResponse updateMyProfile(
            String userCode,
            UserProfileUpdateRequest request) {

        User user =
                userRepository.findByUserCode(userCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        if (request.getFullName() == null ||
                request.getFullName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Full name cannot be empty");
        }

        validateMobile(request.getMobile());

        // Only update the fields allowed for the user
        user.setFullName(
                request.getFullName().trim());

        user.setMobile(
                request.getMobile());

        User updatedUser =
                userRepository.save(user);

        return mapToProfileResponse(updatedUser);
    }

    @Override
    public List<UserProfileResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToProfileResponse)
                .toList();
    }

    @Override
    public void updateUserStatus(
            Long userId,
            UserStatus status) {

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        user.setStatus(status);

        userRepository.save(user);
    }

    @Override
    public void updateUser(
            Long userId,
            UserRegistrationRequest request) {

        validateMobile(request.getMobile());

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User Not Found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setRole(request.getRole());
        user.setUserType(request.getUserType());

        userRepository.save(user);
    }

    private void validateMobile(String mobile) {

        if (mobile == null ||
                !mobile.matches("^[6-9][0-9]{9}$")) {

            throw new RuntimeException(
                    "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9");
        }
    }

    private UserProfileResponse mapToProfileResponse(
            User user) {

        UserProfileResponse response =
                new UserProfileResponse();

        response.setUserId(user.getUserId());
        response.setUserCode(user.getUserCode());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setMobile(user.getMobile());
        response.setRole(user.getRole());
        response.setUserType(user.getUserType());
        response.setStatus(user.getStatus());

        return response;
    }
}