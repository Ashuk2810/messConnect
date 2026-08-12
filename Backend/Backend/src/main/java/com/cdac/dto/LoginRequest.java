package com.cdac.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
	@NotBlank(message ="User Code is required")
	private String userCode;
	
	@NotBlank(message ="Password is required")
	private String password;
	
	public LoginRequest() {
		
	}

	public LoginRequest(@NotBlank(message = "User Code is required") String userCode,
			@NotBlank(message = "Password is required") String password) {
		super();
		this.userCode = userCode;
		this.password = password;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	 
	
	
}
