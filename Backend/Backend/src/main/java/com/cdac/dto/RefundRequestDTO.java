package com.cdac.dto;

public class RefundRequestDTO {

    private Long billId;
    private Double refundAmount;
    private String reason;

    public RefundRequestDTO() {
    }

    public RefundRequestDTO(Long billId, Double refundAmount, String reason) {
        this.billId = billId;
        this.refundAmount = refundAmount;
        this.reason = reason;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public Double getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(Double refundAmount) {
        this.refundAmount = refundAmount;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}