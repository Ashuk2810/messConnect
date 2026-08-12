package com.cdac.dto;

public class DailyRevenueReportDTO {

    private Long totalBills;
    private Double totalRevenue;

    public DailyRevenueReportDTO() {
    }

    public Long getTotalBills() {
        return totalBills;
    }

    public void setTotalBills(Long totalBills) {
        this.totalBills = totalBills;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}