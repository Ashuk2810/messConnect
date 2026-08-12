package com.cdac.dto;

public class RechargeResponse {
	
	private String message;
	private String userCode;
	private Double rechargeAmount;
	private Double currentBalance;
	
	public RechargeResponse() {
		
	}

	public RechargeResponse(String message, String userCode, Double rechargeAmount, Double currentBalance) {
		super();
		this.message = message;
		this.userCode = userCode;
		this.rechargeAmount = rechargeAmount;
		this.currentBalance = currentBalance;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public Double getRechargeAmount() {
		return rechargeAmount;
	}

	public void setRechargeAmount(Double rechargeAmount) {
		this.rechargeAmount = rechargeAmount;
	}

	public Double getCurrentBalance() {
		return currentBalance;
	}

	public void setCurrentBalance(Double currentBalance) {
		this.currentBalance = currentBalance;
	}
	


}
