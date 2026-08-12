package com.cdac.dto;

public class ForgotPasswordRequest {
	
	private String userCode;
	
	public ForgotPasswordRequest() {
		
	}
	
	

	public ForgotPasswordRequest(String userCode) {
		super();
		this.userCode = userCode;
	}



	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	


}
