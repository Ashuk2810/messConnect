package com.cdac.dto;

import java.time.LocalDateTime;

import com.cdac.enums.RefundStatus;

public class RefundResponseDTO {

    private Long refundId;
    private Long billId;
    private String userCode;
    private Double refundAmount;
    private String reason;
    private RefundStatus status;
    private LocalDateTime requestDate;
    private LocalDateTime approvalDate;

    public RefundResponseDTO() {
    }

    public RefundResponseDTO(Long refundId, Long billId, String userCode,
            Double refundAmount, String reason,
            RefundStatus status, LocalDateTime requestDate,
            LocalDateTime approvalDate) {

        this.refundId = refundId;
        this.billId = billId;
        this.userCode = userCode;
        this.refundAmount = refundAmount;
        this.reason = reason;
        this.status = status;
        this.requestDate = requestDate;
        this.approvalDate = approvalDate;
    }

    public Long getRefundId() {
        return refundId;
    }

    public void setRefundId(Long refundId) {
        this.refundId = refundId;
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

    public RefundStatus getStatus() {
        return status;
    }

    public void setStatus(RefundStatus status) {
        this.status = status;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }
}