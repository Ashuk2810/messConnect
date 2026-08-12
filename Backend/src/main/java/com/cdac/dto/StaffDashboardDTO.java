package com.cdac.dto;

public class StaffDashboardDTO {

    private Long todayOrders;
    private Double todayCollection;
    private Long studentsServed;

    public StaffDashboardDTO() {
    }

    public StaffDashboardDTO(
            Long todayOrders,
            Double todayCollection,
            Long studentsServed) {

        this.todayOrders = todayOrders;
        this.todayCollection = todayCollection;
        this.studentsServed = studentsServed;
    }

    public Long getTodayOrders() {
        return todayOrders;
    }

    public void setTodayOrders(Long todayOrders) {
        this.todayOrders = todayOrders;
    }

    public Double getTodayCollection() {
        return todayCollection;
    }

    public void setTodayCollection(Double todayCollection) {
        this.todayCollection = todayCollection;
    }

    public Long getStudentsServed() {
        return studentsServed;
    }

    public void setStudentsServed(Long studentsServed) {
        this.studentsServed = studentsServed;
    }
}