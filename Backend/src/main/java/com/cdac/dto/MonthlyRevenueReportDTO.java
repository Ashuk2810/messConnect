package com.cdac.dto;

public class MonthlyRevenueReportDTO {

    private Long totalBills;
    private Double totalRevenue;

    public MonthlyRevenueReportDTO() {
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