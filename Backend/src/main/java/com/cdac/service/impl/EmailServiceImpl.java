package com.cdac.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.cdac.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService{
	
	
	
@Autowired
private JavaMailSender javaMailSender;

@Override
public void sendOtpEmail(String toEmail, String otp) {
	SimpleMailMessage message = new SimpleMailMessage();
	
	message.setTo(toEmail);
	
	message.setSubject("MessConnect Password Reset OTP");
	
	message.setText(
			 "Dear User,\n\n"
		              + "Your OTP for password reset is: "
		              + otp
		              + "\n\nThis OTP is valid for 5 minutes."
		              + "\n\nDo not share it with anyone."
		              + "\n\nRegards,\nMessConnect Team");
	
	javaMailSender.send(message);
	
    }
@Async
@Override
public void sendRegistrationEmail(
        String toEmail,
        String fullName,
        String userCode,
        String password) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(toEmail);
    message.setSubject("MessConnect - Account Registration");
    message.setText(
            "Hello " + fullName + ",\n\n" +
            "Your MessConnect account has been successfully created by the administrator.\n\n" +
            "Your login credentials are:\n\n" +
            "User Code : " + userCode + "\n" +
            "Password  : " + password + "\n\n" +
            "Please use these credentials to log in to MessConnect.\n" +
            "You can change your password after logging in.\n\n" +
            "Regards,\n" +
            "MessConnect Team"
    );

    javaMailSender.send(message);
}
}
