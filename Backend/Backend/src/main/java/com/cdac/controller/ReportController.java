package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.DailyRevenueReportDTO;
import com.cdac.dto.MonthlyRevenueReportDTO;
import com.cdac.dto.ReportSummaryDTO;
import com.cdac.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Daily Revenue Report
    @GetMapping("/daily-revenue")
    @PreAuthorize("hasRole('ADMIN')")
    public DailyRevenueReportDTO getDailyRevenueReport() {
        return reportService.getDailyRevenueReport();
    }

    // Monthly Revenue Report
    @GetMapping("/monthly-revenue")
    @PreAuthorize("hasRole('ADMIN')")
    public MonthlyRevenueReportDTO getMonthlyRevenueReport() {
        return reportService.getMonthlyRevenueReport();
    }

    // Refund & Feedback Summary
    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public ReportSummaryDTO getReportSummary() {
        return reportService.getReportSummary();
    }
}