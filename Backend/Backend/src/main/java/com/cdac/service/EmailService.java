package com.cdac.service;

public interface EmailService {

	
	void sendOtpEmail(String toEmail, String otp);
	void sendRegistrationEmail( String toEmail, String fullName, String userCode, String password);
}
