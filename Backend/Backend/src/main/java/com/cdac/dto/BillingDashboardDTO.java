package com.cdac.dto;

public class BillingDashboardDTO {

    private Long todayBills;
    private Double todayCollection;

    public BillingDashboardDTO() {
    }

    public Long getTodayBills() {
        return todayBills;
    }

    public void setTodayBills(Long todayBills) {
        this.todayBills = todayBills;
    }

    public Double getTodayCollection() {
        return todayCollection;
    }

    public void setTodayCollection(Double todayCollection) {
        this.todayCollection = todayCollection;
    }
}
