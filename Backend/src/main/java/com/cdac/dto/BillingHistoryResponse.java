package com.cdac.dto;

import java.time.LocalDateTime;

public class BillingHistoryResponse {

    private Long billId;
    private String userCode;
    private String fullName;
    private Double totalAmount;
    private LocalDateTime billDate;
    private String items;

    public BillingHistoryResponse(
            Long billId,
            String userCode,
            String fullName,
            Double totalAmount,
            LocalDateTime billDate,
            String items) {

        this.billId = billId;
        this.userCode = userCode;
        this.fullName = fullName;
        this.totalAmount = totalAmount;
        this.billDate = billDate;
        this.items = items;
    }

    public Long getBillId() {
        return billId;
    }

    public String getUserCode() {
        return userCode;
    }

    public String getFullName() {
        return fullName;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public String getItems() {
        return items;
    }
}