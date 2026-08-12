package com.cdac.dto;

public class BillingCorrectionRequest {

    private Long billId;
    private Long foodId;
    private Integer correctionQuantity;
    private String reason;

    public BillingCorrectionRequest() {
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public Integer getCorrectionQuantity() {
        return correctionQuantity;
    }

    public void setCorrectionQuantity(Integer correctionQuantity) {
        this.correctionQuantity = correctionQuantity;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}