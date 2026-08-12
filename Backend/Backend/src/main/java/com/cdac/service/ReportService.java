package com.cdac.service;

import com.cdac.dto.DailyRevenueReportDTO;
import com.cdac.dto.MonthlyRevenueReportDTO;
import com.cdac.dto.ReportSummaryDTO;

public interface ReportService {

    DailyRevenueReportDTO getDailyRevenueReport();

    MonthlyRevenueReportDTO getMonthlyRevenueReport();

    ReportSummaryDTO getReportSummary();

}