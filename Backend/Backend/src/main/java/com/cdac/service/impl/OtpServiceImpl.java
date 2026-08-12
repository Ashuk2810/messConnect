package com.cdac.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.entity.Otp;
import com.cdac.entity.User;
import com.cdac.repository.OtpRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.EmailService;
import com.cdac.service.OtpService;
import com.cdac.util.OtpGenerator;


@Service
public class OtpServiceImpl implements OtpService  {
	
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    //first method send otp--------------------------
    
    @Override
    public void sendOtp(String userCode) {
    	
    	Optional<User> optionalUser =
    			userRepository.findByUserCode(userCode);
    	
    	if (optionalUser.isEmpty()) {
    		throw new RuntimeException("invalid user code");
    	}
    	User user =optionalUser.get();
    	
    	String generatedOtp =OtpGenerator.generateOtp();
    	
    	Otp otp =new Otp();
    	
    	otp.setOtp(generatedOtp);
    	
    	otp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
    	
    	otp.setIsUsed(false);
    	
    	otp.setUser(user);
    	
    	otpRepository.save(otp);
    	
    	emailService.sendOtpEmail(user.getEmail(),generatedOtp);
    	
    	
    }
    
    //verfiy otp-----------------------

	@Override
	public void verifyOtp(String userCode, String enteredOtp) {
		// TODO Auto-generated method stub
		Optional<User> optionalUser =
    			userRepository.findByUserCode(userCode);
    	
    	if (optionalUser.isEmpty()) {
    		throw new RuntimeException("invalid user code");
    	}
    	User user =optionalUser.get();
    	
    	Otp otp = otpRepository
    			.findTopByUserOrderByExpiryTimeDesc(user)
    			.orElseThrow(()->
    			              new RuntimeException("otp not found"));
	
    	if (otp.getIsUsed()) {
            throw new RuntimeException("OTP already used");
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        if (!otp.getOtp().equals(enteredOtp)) {
            throw new RuntimeException("Invalid OTP");
        }
        
        otp.setIsUsed(true);
        user.setOtpVerified(true);
        userRepository.save(user);
	}

	//reset password method-----------
	@Override
	public void resetPassword(String userCode, String newPassword) {
		// TODO Auto-generated method stub
		
		User user =userRepository.findByUserCode(userCode)
				.orElseThrow(() ->
				       new RuntimeException("Invalid user code"));

	    if (!user.getOtpVerified()) {
	        throw new RuntimeException("Please verify OTP first");
	    }

		user.setPassword(passwordEncoder.encode(newPassword));
		
		user.setIsPasswordChanged(true);
	     user.setOtpVerified(false);
	
		userRepository.save(user);
		
	}

}
