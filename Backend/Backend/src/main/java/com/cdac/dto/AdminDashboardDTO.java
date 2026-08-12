package com.cdac.dto;

public class AdminDashboardDTO {

    private Long totalStudents;
    private Long totalStaff;
    private Long totalFoodItems;
    private Long todayBills;
    private Double todayRevenue;
    private Double totalWalletBalance;

    public AdminDashboardDTO() {
    }

    public AdminDashboardDTO(
            Long totalStudents,
            Long totalStaff,
            Long totalFoodItems,
            Long todayBills,
            Double todayRevenue,
            Double totalWalletBalance) {

        this.totalStudents = totalStudents;
        this.totalStaff = totalStaff;
        this.totalFoodItems = totalFoodItems;
        this.todayBills = todayBills;
        this.todayRevenue = todayRevenue;
        this.totalWalletBalance = totalWalletBalance;
    }

    public Long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public Long getTotalStaff() {
        return totalStaff;
    }

    public void setTotalStaff(Long totalStaff) {
        this.totalStaff = totalStaff;
    }

    public Long getTotalFoodItems() {
        return totalFoodItems;
    }

    public void setTotalFoodItems(Long totalFoodItems) {
        this.totalFoodItems = totalFoodItems;
    }

    public Long getTodayBills() {
        return todayBills;
    }

    public void setTodayBills(Long todayBills) {
        this.todayBills = todayBills;
    }

    public Double getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(Double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public Double getTotalWalletBalance() {
        return totalWalletBalance;
    }

    public void setTotalWalletBalance(Double totalWalletBalance) {
        this.totalWalletBalance = totalWalletBalance;
    }

	public void setPendingRefundRequests(long size) {
		// TODO Auto-generated method stub
		
	}

	public void setAverageRating(double d) {
		// TODO Auto-generated method stub
		
	}

	public void setTotalUsers(long count) {
		// TODO Auto-generated method stub
		
	}
}