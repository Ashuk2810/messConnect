package com.cdac.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

import org.springframework.stereotype.Service;

import com.cdac.dto.DailyRevenueReportDTO;
import com.cdac.dto.MonthlyRevenueReportDTO;
import com.cdac.dto.ReportSummaryDTO;
import com.cdac.enums.RefundStatus;
import com.cdac.repository.BillRepository;
import com.cdac.repository.FeedbackRepository;
import com.cdac.repository.RefundRepository;
import com.cdac.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    private final BillRepository billRepository;
    private final RefundRepository refundRepository;
    private final FeedbackRepository feedbackRepository;

    public ReportServiceImpl(BillRepository billRepository,
                             RefundRepository refundRepository,
                             FeedbackRepository feedbackRepository) {

        this.billRepository = billRepository;
        this.refundRepository = refundRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public DailyRevenueReportDTO getDailyRevenueReport() {

        DailyRevenueReportDTO dto = new DailyRevenueReportDTO();

        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = LocalDate.now().plusDays(1).atStartOfDay();

        dto.setTotalBills(billRepository.countByBillDateBetween(start, end));
        dto.setTotalRevenue(billRepository.getTodayRevenue(start, end));

        return dto;
    }

    @Override
    public MonthlyRevenueReportDTO getMonthlyRevenueReport() {

        MonthlyRevenueReportDTO dto = new MonthlyRevenueReportDTO();

        YearMonth month = YearMonth.now();

        LocalDateTime start = month.atDay(1).atStartOfDay();
        LocalDateTime end = month.plusMonths(1).atDay(1).atStartOfDay();

        dto.setTotalBills(billRepository.countByBillDateBetween(start, end));
        dto.setTotalRevenue(billRepository.getMonthlyRevenue(start, end));

        return dto;
    }

    @Override
    public ReportSummaryDTO getReportSummary() {

        ReportSummaryDTO dto = new ReportSummaryDTO();

        dto.setPendingRefunds(refundRepository.countByStatus(RefundStatus.PENDING));
        dto.setApprovedRefunds(refundRepository.countByStatus(RefundStatus.APPROVED));
        dto.setRejectedRefunds(refundRepository.countByStatus(RefundStatus.REJECTED));

        dto.setTotalFeedbacks(feedbackRepository.count());
        dto.setAverageRating(feedbackRepository.getAverageRating());

        return dto;
    }
}