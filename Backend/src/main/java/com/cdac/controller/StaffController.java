package com.cdac.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.StaffDashboardDTO;
import com.cdac.repository.BillRepository;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private BillRepository billRepository;

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('BILLING_STAFF')")
    public StaffDashboardDTO getDashboard() {

        LocalDate today = LocalDate.now();

        LocalDateTime startOfDay =
                LocalDateTime.of(today, LocalTime.MIN);

        LocalDateTime endOfDay =
                LocalDateTime.of(today, LocalTime.MAX);

        Long todayOrders =
                billRepository.countByBillDateBetween(
                        startOfDay,
                        endOfDay
                );

        Double todayCollection =
                billRepository.getTodayRevenue(
                        startOfDay,
                        endOfDay
                );

        Long studentsServed =
                billRepository.countStudentsServedToday(
                        startOfDay,
                        endOfDay
                );

        return new StaffDashboardDTO(
                todayOrders,
                todayCollection,
                studentsServed
        );
    }
}