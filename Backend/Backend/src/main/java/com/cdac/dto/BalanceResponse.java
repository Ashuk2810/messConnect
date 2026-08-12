package com.cdac.dto;

public class BalanceResponse {

    private String userCode;
    private Double balance;

    public BalanceResponse() {
    }

    public BalanceResponse(String userCode, Double balance) {
        this.userCode = userCode;
        this.balance = balance;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}