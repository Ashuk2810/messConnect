package com.cdac.service;

public interface OtpService {

    void sendOtp(String userCode);

    void verifyOtp(String userCode, String otp);

    void resetPassword(String userCode, String newPassword);

}
