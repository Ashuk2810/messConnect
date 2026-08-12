package com.cdac.dto;

import com.cdac.enums.*;


public class LoginResponse {

	 private Long userId;
	 private String userCode;
	 private String fullName;
	 private Role role;
	 private UserType userType;
	 private Boolean isPasswordChanged;
	 private String message;
	 private String token;
	 
	 public LoginResponse() {
		 
	 }

	 public LoginResponse(Long userId, String userCode, String fullName, Role role, UserType userType,
			Boolean isPasswordChanged, String message, String token) {
		super();
		this.userId = userId;
		this.userCode = userCode;
		this.fullName = fullName;
		this.role = role;
		this.userType = userType;
		this.isPasswordChanged = isPasswordChanged;
		this.message = message;
		this.token = token;
	 }

	 public Long getUserId() {
		 return userId;
	 }

	 public void setUserId(Long userId) {
		 this.userId = userId;
	 }

	 public String getUserCode() {
		 return userCode;
	 }

	 public void setUserCode(String userCode) {
		 this.userCode = userCode;
	 }

	 public String getFullName() {
		 return fullName;
	 }

	 public void setFullName(String fullName) {
		 this.fullName = fullName;
	 }

	 public Role getRole() {
		 return role;
	 }

	 public void setRole(Role role) {
		 this.role = role;
	 }

	 public UserType getUserType() {
		 return userType;
	 }

	 public void setUserType(UserType userType) {
		 this.userType = userType;
	 }

	 public Boolean getIsPasswordChanged() {
		 return isPasswordChanged;
	 }

	 public void setIsPasswordChanged(Boolean isPasswordChanged) {
		 this.isPasswordChanged = isPasswordChanged;
	 }

	 public String getMessage() {
		 return message;
	 }

	 public void setMessage(String message) {
		 this.message = message;
	 }

	 public String getToken() {
		 return token;
	 }

	 public void setToken(String token) {
		 this.token = token;
	 }

	
	 
}
