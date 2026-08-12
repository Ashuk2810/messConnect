package com.cdac.dto;

import com.cdac.entity.User;

public class RechargeRequest {
	private String userCode;
	private Double amount;
	
	public RechargeRequest() {
		
	}

	public RechargeRequest(String userCode, Double amount) {
		super();
		this.userCode = userCode;
		this.amount = amount;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	

}
