package com.cdac.dto;

public class ResetPasswordRequest {
	
	private String userCode;
	private String newPassword;
	
	public ResetPasswordRequest() {
		
	}

	public ResetPasswordRequest(String userCode, String newPassword) {
		super();
		this.userCode = userCode;
		this.newPassword = newPassword;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	
}
