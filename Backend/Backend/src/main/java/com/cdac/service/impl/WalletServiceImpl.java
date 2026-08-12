package com.cdac.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.BalanceResponse;
import com.cdac.dto.RechargeRequest;
import com.cdac.dto.RechargeResponse;
import com.cdac.dto.WalletHistoryResponse;
import com.cdac.entity.User;
import com.cdac.entity.Wallet;
import com.cdac.entity.WalletHistory;
import com.cdac.enums.TransactionType;
import com.cdac.enums.UserStatus;
import com.cdac.repository.WalletHistoryRepository;
import com.cdac.repository.WalletRepository;
import com.cdac.service.NotificationService;
import com.cdac.service.WalletService;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletHistoryRepository walletHistoryRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public RechargeResponse rechargeWallet(
            RechargeRequest request) {

        if (request.getAmount() <= 0) {

            throw new RuntimeException(
                    "Recharge amount must be greater than zero.");
        }

        Optional<Wallet> optionalWallet =
                walletRepository.findByUserUserCode(
                        request.getUserCode());

        if (optionalWallet.isEmpty()) {

            throw new RuntimeException(
                    "Wallet not found.");
        }

        Wallet wallet = optionalWallet.get();

        User user = wallet.getUser();

        // Block recharge for inactive users
        if (user.getStatus() != UserStatus.ACTIVE) {

            throw new RuntimeException(
                    "Cannot recharge wallet. User account is inactive.");
        }

        wallet.setBalance(
                wallet.getBalance()
                        + request.getAmount());

        walletRepository.save(wallet);

        notificationService.createNotification(
                wallet.getUser(),
                "Wallet recharge of ₹"
                        + request.getAmount()
                        + " completed successfully."
        );

        if (wallet.getBalance()
                <= wallet.getLowBalanceThreshold()) {

            notificationService.createNotification(
                    wallet.getUser(),
                    "Low wallet balance. Current balance is ₹"
                            + wallet.getBalance()
            );
        }

        WalletHistory walletHistory =
                new WalletHistory();

        walletHistory.setWallet(wallet);
        walletHistory.setTransactionType(
                TransactionType.RECHARGE);
        walletHistory.setAmount(
                request.getAmount());
        walletHistory.setBalanceAfterTransaction(
                wallet.getBalance());
        walletHistory.setTransactionDate(
                LocalDateTime.now());

        walletHistoryRepository.save(walletHistory);

        return new RechargeResponse(
                "Wallet Recharged Successfully",
                request.getUserCode(),
                request.getAmount(),
                wallet.getBalance()
        );
    }

    @Override
    public BalanceResponse getBalance(
            String userCode) {

        Wallet wallet =
                walletRepository
                        .findByUserUserCode(userCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Wallet not found"));

        return new BalanceResponse(
                userCode,
                wallet.getBalance()
        );
    }

    @Override
    public List<WalletHistoryResponse> getWalletHistory(
            String userCode) {

        Wallet wallet =
                walletRepository
                        .findByUserUserCode(userCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Wallet not found"));

        List<WalletHistory> historyList =
                walletHistoryRepository
                        .findByWalletOrderByTransactionDateDesc(
                                wallet);

        List<WalletHistoryResponse> responseList =
                new ArrayList<>();

        for (WalletHistory history : historyList) {

            WalletHistoryResponse response =
                    new WalletHistoryResponse();

            response.setHistoryId(
                    history.getHistoryId());

            response.setTransactionType(
                    history.getTransactionType());

            response.setAmount(
                    history.getAmount());

            response.setBalanceAfterTransaction(
                    history.getBalanceAfterTransaction());

            response.setTransactionDate(
                    history.getTransactionDate());

            responseList.add(response);
        }

        return responseList;
    }
}