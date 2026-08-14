package com.cdac.dto;

import lombok.Data;

@Data
public class UserRegistrationResponse {

    private String message;
    private String userCode;
    private String temporarayPassword;

    public UserRegistrationResponse() {
    }

    public UserRegistrationResponse(
            String message,
            String userCode,
            String temporarayPassword) {

        super();
        this.message = message;
        this.userCode = userCode;
        this.temporarayPassword = temporarayPassword;
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

    public String getTemporarayPassword() {
        return temporarayPassword;
    }

    public void setTemporarayPassword(String temporarayPassword) {
        this.temporarayPassword = temporarayPassword;
    }
}