package com.cdac.dto;

public class ReportSummaryDTO {

    private Long pendingRefunds;
    private Long approvedRefunds;
    private Long rejectedRefunds;

    private Long totalFeedbacks;
    private Double averageRating;

    public ReportSummaryDTO() {
    }

    public Long getPendingRefunds() {
        return pendingRefunds;
    }

    public void setPendingRefunds(Long pendingRefunds) {
        this.pendingRefunds = pendingRefunds;
    }

    public Long getApprovedRefunds() {
        return approvedRefunds;
    }

    public void setApprovedRefunds(Long approvedRefunds) {
        this.approvedRefunds = approvedRefunds;
    }

    public Long getRejectedRefunds() {
        return rejectedRefunds;
    }

    public void setRejectedRefunds(Long rejectedRefunds) {
        this.rejectedRefunds = rejectedRefunds;
    }

    public Long getTotalFeedbacks() {
        return totalFeedbacks;
    }

    public void setTotalFeedbacks(Long totalFeedbacks) {
        this.totalFeedbacks = totalFeedbacks;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}