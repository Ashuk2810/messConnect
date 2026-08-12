package com.cdac.service;

import com.cdac.dto.AdminDashboardDTO;
import com.cdac.dto.BillingDashboardDTO;
import com.cdac.dto.UserDashboardDTO;

public interface DashboardService {

    AdminDashboardDTO getAdminDashboard();

    BillingDashboardDTO getBillingDashboard();

    UserDashboardDTO getUserDashboard(String userCode);

}