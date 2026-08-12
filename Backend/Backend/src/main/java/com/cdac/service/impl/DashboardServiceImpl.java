package com.cdac.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cdac.dto.AdminDashboardDTO;
import com.cdac.dto.BillingDashboardDTO;

import com.cdac.dto.UserDashboardDTO;
import com.cdac.entity.Wallet;
import com.cdac.enums.RefundStatus;
import com.cdac.repository.BillRepository;
import com.cdac.repository.FeedbackRepository;
import com.cdac.repository.FoodRepository;
import com.cdac.repository.RefundRepository;
import com.cdac.repository.UserRepository;
import com.cdac.repository.WalletRepository;
import com.cdac.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final FoodRepository foodRepository;
    private final BillRepository billRepository;
    private final RefundRepository refundRepository;
    private final FeedbackRepository feedbackRepository;
    private final WalletRepository walletRepository;

    public DashboardServiceImpl(UserRepository userRepository,
                                FoodRepository foodRepository,
                                BillRepository billRepository,
                                RefundRepository refundRepository,
                                FeedbackRepository feedbackRepository,
                                WalletRepository walletRepository) {

        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
        this.billRepository = billRepository;
        this.refundRepository = refundRepository;
        this.feedbackRepository = feedbackRepository;
        this.walletRepository = walletRepository;
    }

    @Override
    public AdminDashboardDTO getAdminDashboard() {

        AdminDashboardDTO response = new AdminDashboardDTO();

        response.setTotalUsers(userRepository.count());

        response.setTotalFoodItems(foodRepository.count());

        response.setTodayBills(
                billRepository.countByBillDateBetween(
                        LocalDate.now().atStartOfDay(),
                        LocalDate.now().plusDays(1).atStartOfDay()));

        response.setTodayRevenue(
                billRepository.getTodayRevenue(
                        LocalDate.now().atStartOfDay(),
                        LocalDate.now().plusDays(1).atStartOfDay()));

        response.setPendingRefundRequests(
                (long) refundRepository
                        .findByStatusOrderByRequestDateAsc(RefundStatus.PENDING)
                        .size());

        Double averageRating = feedbackRepository.getAverageRating();

        response.setAverageRating(averageRating == null ? 0.0 : averageRating);

        return response;
    }
        @Override
        public BillingDashboardDTO getBillingDashboard() {

            BillingDashboardDTO response = new BillingDashboardDTO();

            response.setTodayBills(
                    billRepository.countByBillDateBetween(
                            LocalDate.now().atStartOfDay(),
                            LocalDate.now().plusDays(1).atStartOfDay()));

            response.setTodayCollection(
                    billRepository.getTodayRevenue(
                            LocalDate.now().atStartOfDay(),
                            LocalDate.now().plusDays(1).atStartOfDay()));

            return response;
        }

        @Override
        public UserDashboardDTO getUserDashboard(String userCode) {

            UserDashboardDTO response = new UserDashboardDTO();

            Wallet wallet = walletRepository.findByUserUserCode(userCode)
                    .orElseThrow(() -> new RuntimeException("Wallet not found."));

            response.setWalletBalance(wallet.getBalance());

            return response;
        }
    }