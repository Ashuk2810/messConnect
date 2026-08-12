package com.cdac.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AdminDashboardDTO;
import com.cdac.dto.BillingDashboardDTO;
import com.cdac.dto.UserDashboardDTO;
import com.cdac.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Admin Dashboard
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminDashboardDTO getAdminDashboard() {
        return dashboardService.getAdminDashboard();
    }

    // Billing Staff Dashboard
    @GetMapping("/billing")
    @PreAuthorize("hasRole('BILLING_STAFF')")
    public BillingDashboardDTO getBillingDashboard() {
        return dashboardService.getBillingDashboard();
    }

    // User Dashboard
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public UserDashboardDTO getUserDashboard(Principal principal) {
        return dashboardService.getUserDashboard(principal.getName());
    }
}