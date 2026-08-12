package com.cdac.dto;

import java.time.LocalDateTime;

public class TodayBillResponse {

    private Long billId;
    private String userCode;
    private String fullName;
    private Double totalAmount;
    private LocalDateTime billDate;

    public TodayBillResponse() {
    }

    public TodayBillResponse(
            Long billId,
            String userCode,
            String fullName,
            Double totalAmount,
            LocalDateTime billDate) {

        this.billId = billId;
        this.userCode = userCode;
        this.fullName = fullName;
        this.totalAmount = totalAmount;
        this.billDate = billDate;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
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

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDateTime billDate) {
        this.billDate = billDate;
    }
}