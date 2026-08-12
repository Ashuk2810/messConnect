package com.cdac.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dto.RefundRequestDTO;
import com.cdac.dto.RefundResponseDTO;
import com.cdac.entity.Bill;
import com.cdac.entity.Refund;
import com.cdac.entity.User;
import com.cdac.entity.Wallet;
import com.cdac.entity.WalletHistory;
import com.cdac.enums.RefundStatus;
import com.cdac.enums.TransactionType;
import com.cdac.repository.BillRepository;
import com.cdac.repository.RefundRepository;
import com.cdac.repository.UserRepository;
import com.cdac.repository.WalletHistoryRepository;
import com.cdac.repository.WalletRepository;
import com.cdac.service.NotificationService;
import com.cdac.service.RefundService;

@Service
@Transactional
public class RefundServiceImpl implements RefundService {

    @Autowired
    private NotificationService notificationService;

    private final RefundRepository refundRepository;
    private final BillRepository billRepository;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final WalletHistoryRepository walletHistoryRepository;

    public RefundServiceImpl(
            RefundRepository refundRepository,
            BillRepository billRepository,
            UserRepository userRepository,
            WalletRepository walletRepository,
            WalletHistoryRepository walletHistoryRepository) {

        this.refundRepository = refundRepository;
        this.billRepository = billRepository;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.walletHistoryRepository = walletHistoryRepository;
    }

    // ==============================
    // STAFF - CREATE REFUND REQUEST
    // ==============================

    @Override
    public RefundResponseDTO createRefundRequest(
            RefundRequestDTO request,
            String userCode) {

        Bill bill = billRepository.findById(request.getBillId())
                .orElseThrow(() ->
                        new RuntimeException("Bill not found."));

        if (refundRepository.existsByBill(bill)) {
            throw new RuntimeException(
                    "Refund request already exists for this bill.");
        }

        User billingStaff = userRepository
                .findByUserCode(userCode)
                .orElseThrow(() ->
                        new RuntimeException("Billing Staff not found."));

        Refund refund = new Refund();

        refund.setBill(bill);
        refund.setUser(bill.getUser());
        refund.setRequestedBy(billingStaff);
        refund.setRefundAmount(request.getRefundAmount());
        refund.setReason(request.getReason());
        refund.setStatus(RefundStatus.PENDING);
        refund.setRequestDate(LocalDateTime.now());

        Refund savedRefund = refundRepository.save(refund);

        return mapToResponse(savedRefund);
    }

    // ==============================
    // ADMIN - GET PENDING REFUNDS
    // ==============================

    @Override
    public List<RefundResponseDTO> getPendingRefundRequests() {

        return refundRepository
                .findByStatusOrderByRequestDateAsc(
                        RefundStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==============================
    // ADMIN - APPROVE REFUND
    // ==============================

    @Override
    public RefundResponseDTO approveRefund(
            Long refundId,
            String adminUserCode) {

        Refund refund = refundRepository.findById(refundId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Refund request not found."));

        if (refund.getStatus() != RefundStatus.PENDING) {
            throw new RuntimeException(
                    "Refund request is already processed.");
        }

        User admin = userRepository
                .findByUserCode(adminUserCode)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found."));

        User user = refund.getUser();

        Wallet wallet = walletRepository
                .findByUserUserCode(user.getUserCode())
                .orElseThrow(() ->
                        new RuntimeException("Wallet not found."));

        // Add refund amount to user's wallet
        wallet.setBalance(
                wallet.getBalance()
                        + refund.getRefundAmount()
        );

        walletRepository.save(wallet);

        // Create wallet history
        WalletHistory walletHistory = new WalletHistory();

        walletHistory.setWallet(wallet);
        walletHistory.setAmount(refund.getRefundAmount());
        walletHistory.setTransactionType(
                TransactionType.REFUND
        );
        walletHistory.setBalanceAfterTransaction(
                wallet.getBalance()
        );
        walletHistory.setTransactionDate(
                LocalDateTime.now()
        );

        walletHistoryRepository.save(walletHistory);

        // Update refund
        refund.setStatus(RefundStatus.APPROVED);
        refund.setApprovedBy(admin);
        refund.setApprovalDate(LocalDateTime.now());

        Refund updatedRefund =
                refundRepository.save(refund);

        // Send notification to user
        notificationService.createNotification(
                user,
                "Your refund request for Bill ID "
                + refund.getBill().getBillId()
                + " has been approved. ₹"
                + refund.getRefundAmount()
                + " has been credited to your wallet."
        );

        return mapToResponse(updatedRefund);
    }

    // ==============================
    // ADMIN - REJECT REFUND
    // ==============================

    @Override
    public RefundResponseDTO rejectRefund(
            Long refundId,
            String adminUserCode) {

        Refund refund = refundRepository.findById(refundId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Refund request not found."));

        if (refund.getStatus() != RefundStatus.PENDING) {
            throw new RuntimeException(
                    "Refund request is already processed.");
        }

        User admin = userRepository
                .findByUserCode(adminUserCode)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found."));

        // Update refund status
        refund.setStatus(RefundStatus.REJECTED);
        refund.setApprovedBy(admin);
        refund.setApprovalDate(LocalDateTime.now());

        Refund updatedRefund =
                refundRepository.save(refund);

        // Send rejection notification to user
        notificationService.createNotification(
                refund.getUser(),
                "Your refund request for Bill ID "
                + refund.getBill().getBillId()
                + " has been rejected."
        );

        return mapToResponse(updatedRefund);
    }

    // ==============================
    // USER - REFUND HISTORY
    // ==============================

    @Override
    public List<RefundResponseDTO> getMyRefundHistory(
            String userCode) {

        User user = userRepository
                .findByUserCode(userCode)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        return refundRepository
                .findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==============================
    // ENTITY -> DTO
    // ==============================

    private RefundResponseDTO mapToResponse(
            Refund refund) {

        RefundResponseDTO response =
                new RefundResponseDTO();

        response.setRefundId(
                refund.getRefundId());

        response.setBillId(
                refund.getBill().getBillId());

        response.setUserCode(
                refund.getUser().getUserCode());

        response.setRefundAmount(
                refund.getRefundAmount());

        response.setReason(
                refund.getReason());

        response.setStatus(
                refund.getStatus());

        response.setRequestDate(
                refund.getRequestDate());

        response.setApprovalDate(
                refund.getApprovalDate());

        return response;
    }
}