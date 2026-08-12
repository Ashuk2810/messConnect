package com.cdac.dto;

public class RefundApprovalDTO {

    private Long refundId;

    public RefundApprovalDTO() {
    }

    public RefundApprovalDTO(Long refundId) {
        this.refundId = refundId;
    }

    public Long getRefundId() {
        return refundId;
    }

    public void setRefundId(Long refundId) {
        this.refundId = refundId;
    }
}