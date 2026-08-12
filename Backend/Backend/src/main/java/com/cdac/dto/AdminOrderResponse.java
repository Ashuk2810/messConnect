package com.cdac.dto;

import java.time.LocalDateTime;

public class AdminOrderResponse {

    private Long billId;
    private String userCode;
    private String studentName;
    private String items;
    private Double amount;
    private String status;
    private LocalDateTime billDate;

    public AdminOrderResponse() {
    }

    public AdminOrderResponse(
            Long billId,
            String userCode,
            String studentName,
            String items,
            Double amount,
            String status,
            LocalDateTime billDate) {

        this.billId = billId;
        this.userCode = userCode;
        this.studentName = studentName;
        this.items = items;
        this.amount = amount;
        this.status = status;
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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getItems() {
        return items;
    }

    public void setItems(String items) {
        this.items = items;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDateTime billDate) {
        this.billDate = billDate;
    }
}