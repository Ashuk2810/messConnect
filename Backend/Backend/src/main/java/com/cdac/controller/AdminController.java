package com.cdac.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AdminDashboardDTO;
import com.cdac.enums.UserType;
import com.cdac.repository.BillRepository;
import com.cdac.repository.FoodRepository;
import com.cdac.repository.UserRepository;
import com.cdac.repository.WalletRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


@Autowired
private UserRepository userRepository;

@Autowired
private FoodRepository foodRepository;

@Autowired
private BillRepository billRepository;

@Autowired
private WalletRepository walletRepository;

@GetMapping("/test")
public String adminTest() {
    return "Welcome Admin";
}

@GetMapping("/dashboard")
@PreAuthorize("hasAuthority('ADMIN')")
public AdminDashboardDTO getDashboard() {

	long totalStudents =
			userRepository.countByUserType(UserType.HOSTELLER)
	        + userRepository.countByUserType(UserType.DAY_SCHOLAR);

	Long totalStaff =
			userRepository.countByUserType(UserType.STAFF);

    Long totalFoodItems =
            foodRepository.count();

    LocalDate today = LocalDate.now();

    LocalDateTime startOfDay =
            LocalDateTime.of(today, LocalTime.MIN);

    LocalDateTime endOfDay =
            LocalDateTime.of(today, LocalTime.MAX);

    Long todayBills =
            billRepository.countByBillDateBetween(
                    startOfDay,
                    endOfDay);

    Double todayRevenue =
            billRepository.getTodayRevenue(
                    startOfDay,
                    endOfDay);

    Double totalWalletBalance =
            walletRepository.getTotalWalletBalance();

    return new AdminDashboardDTO(
            totalStudents,
            totalStaff,
            totalFoodItems,
            todayBills,
            todayRevenue,
            totalWalletBalance
    );
}

}
