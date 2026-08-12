package com.cdac.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;


@Entity
@Table(name ="otp")
public class Otp {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long otpId;
	
	@Column(nullable = false)
	private String otp;
	
	@Column(nullable = false)
	private LocalDateTime expiryTime;
	
	@Column(nullable = false)
	private Boolean isUsed;
	
	@ManyToOne
	@JoinColumn(name ="user_id", nullable =false)
	private User user;
	
	
	

	public Long getOtpId() {
		return otpId;
	}

	public void setOtpId(Long otpId) {
		this.otpId = otpId;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public LocalDateTime getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(LocalDateTime expiryTime) {
		this.expiryTime = expiryTime;
	}

	public Boolean getIsUsed() {
		return isUsed;
	}

	public void setIsUsed(Boolean isUsed) {
		this.isUsed = isUsed;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Otp(Long otpId, String otp, LocalDateTime expiryTime, Boolean isUsed, User user) {
		super();
		this.otpId = otpId;
		this.otp = otp;
		this.expiryTime = expiryTime;
		this.isUsed = isUsed;
		this.user = user;
	}

	public Otp() {
		
	}
	
	
	
}
