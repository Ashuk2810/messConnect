package com.cdac.dto;

public class VerifyOtpRequest {
	
	private String userCode;
	private String otp;
	
	public VerifyOtpRequest() {
		
	}

	public VerifyOtpRequest(String userCode, String otp) {
		super();
		this.userCode = userCode;
		this.otp = otp;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
	
	

}
