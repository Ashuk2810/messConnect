package com.cdac.entity;

import com.cdac.enums.Role;
import com.cdac.enums.UserStatus;
import com.cdac.enums.UserType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;




@Entity
@Table(name= "users")
@Getter
@Setter

public class User {
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long userId;
	
	@Column(unique =true, nullable =false)
	private String userCode;
	private String fullName;
	@Column(unique = true, nullable = false)
	private String email;
	private String mobile;
	
	
	@Column(nullable =false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@Enumerated(EnumType.STRING)
	private UserType userType;
	
	@Enumerated(EnumType.STRING)
	private UserStatus status;
	
	private Boolean isPasswordChanged =false;
	
	@Column(nullable = false)
	private Boolean otpVerified = false;

	public Boolean getOtpVerified() {
		return otpVerified;
	}

	public void setOtpVerified(Boolean otpVerified) {
		this.otpVerified = otpVerified;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public UserStatus getStatus() {
		return status;
	}

	public void setStatus(UserStatus status) {
		this.status = status;
	}

	public Boolean getIsPasswordChanged() {
		return isPasswordChanged;
	}

	public void setIsPasswordChanged(Boolean isPasswordChanged) {
		this.isPasswordChanged = isPasswordChanged;
	}
	
	
	
	
	
	
	

}
