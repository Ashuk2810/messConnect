package com.cdac.dto;

import java.time.LocalDateTime;

public class RecentMealResponse {

    private Long billId;
    private LocalDateTime billDate;
    private Double amount;
    private String items;

    public RecentMealResponse() {
    }

    public RecentMealResponse(
            Long billId,
            LocalDateTime billDate,
            Double amount,
            String items) {

        this.billId = billId;
        this.billDate = billDate;
        this.amount = amount;
        this.items = items;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDateTime billDate) {
        this.billDate = billDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getItems() {
        return items;
    }

    public void setItems(String items) {
        this.items = items;
    }
}