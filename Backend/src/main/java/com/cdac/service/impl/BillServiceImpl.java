package com.cdac.service.impl;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.BillRequest;
import com.cdac.dto.BillResponse;
import com.cdac.dto.BillingCorrectionItemResponse;
import com.cdac.dto.BillingCorrectionRequest;
import com.cdac.dto.BillItemRequest;
import com.cdac.dto.RecentMealResponse;
import com.cdac.dto.AdminOrderResponse;

import com.cdac.repository.BillItemRepository;
import com.cdac.repository.BillRepository;
import com.cdac.repository.FoodRepository;
import com.cdac.repository.UserRepository;
import com.cdac.repository.WalletHistoryRepository;
import com.cdac.repository.WalletRepository;

import com.cdac.service.BillService;

import com.cdac.entity.User;
import com.cdac.entity.Wallet;
import com.cdac.entity.Bill;
import com.cdac.entity.BillItem;
import com.cdac.entity.Food;
import com.cdac.entity.WalletHistory;

import com.cdac.enums.TransactionType;
import com.cdac.enums.UserStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.cdac.dto.TodayBillResponse;
import com.cdac.dto.BillingHistoryResponse;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillItemRepository billItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletHistoryRepository walletHistoryRepository;


    @Transactional
    @Override
    public BillResponse generateBill(BillRequest request) {

        Optional<User> optionalUser =
                userRepository.findByUserCode(
                        request.getUserCode());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException(
                    "Cannot generate bill. User account is inactive.");
        }

        Optional<Wallet> optionalWallet =
                walletRepository.findByUserUserCode(
                        request.getUserCode());

        if (optionalWallet.isEmpty()) {
            throw new RuntimeException("Wallet not found");
        }

        Wallet wallet = optionalWallet.get();

        double totalAmount = 0.0;

        List<BillItem> billItems = new ArrayList<>();

        for (BillItemRequest itemRequest : request.getItems()) {

            Optional<Food> optionalFood =
                    foodRepository.findById(
                            itemRequest.getFoodId());

            if (optionalFood.isEmpty()) {
                throw new RuntimeException("Food not found");
            }

            Food food = optionalFood.get();

            if (itemRequest.getQuantity() <= 0) {
                throw new RuntimeException(
                        "Food quantity must be greater than zero");
            }

            double itemTotal =
                    food.getPrice() *
                    itemRequest.getQuantity();

            totalAmount += itemTotal;

            BillItem billItem = new BillItem();

            billItem.setFood(food);
            billItem.setQuantity(
                    itemRequest.getQuantity());
            billItem.setPrice(food.getPrice());

            billItems.add(billItem);
        }

        if (wallet.getBalance() < totalAmount) {
            throw new RuntimeException(
                    "Insufficient wallet balance");
        }

        wallet.setBalance(
                wallet.getBalance() - totalAmount);

        walletRepository.save(wallet);

        WalletHistory walletHistory =
                new WalletHistory();

        walletHistory.setWallet(wallet);

        walletHistory.setTransactionType(
                TransactionType.BILL);

        walletHistory.setAmount(totalAmount);

        walletHistory.setBalanceAfterTransaction(
                wallet.getBalance());

        walletHistory.setTransactionDate(
                LocalDateTime.now());

        walletHistoryRepository.save(walletHistory);

        Bill bill = new Bill();

        bill.setUser(user);
        bill.setTotalAmount(totalAmount);
        bill.setBillDate(LocalDateTime.now());

        bill = billRepository.save(bill);

        for (BillItem billItem : billItems) {

            billItem.setBill(bill);

            billItemRepository.save(billItem);
        }

        BillResponse response =
                new BillResponse();

        response.setBillId(bill.getBillId());
        response.setUserCode(user.getUserCode());
        response.setTotalAmount(totalAmount);
        response.setBillDate(bill.getBillDate());
        response.setMessage(
                "Bill generated successfully");

        return response;
    }


    @Override
    public List<RecentMealResponse> getRecentMeals(
            String userCode) {

        List<Bill> bills =
                billRepository
                        .findTop10ByUserUserCodeOrderByBillDateDesc(
                                userCode);

        return bills.stream()
                .map(bill -> {

                    String items =
                            bill.getBillItems()
                                    .stream()
                                    .map(item ->
                                            item.getFood()
                                                    .getFoodName()
                                                    + " x "
                                                    + item.getQuantity())
                                    .collect(
                                            Collectors.joining(", "));

                    return new RecentMealResponse(
                            bill.getBillId(),
                            bill.getBillDate(),
                            bill.getTotalAmount(),
                            items
                    );

                })
                .toList();
    }


    @Override
    public List<AdminOrderResponse> getAllOrders() {

        List<Bill> bills =
                billRepository
                        .findAllByOrderByBillDateDesc();

        return bills.stream()
                .map(bill -> {

                    String items =
                            bill.getBillItems()
                                    .stream()
                                    .map(item ->
                                            item.getFood()
                                                    .getFoodName()
                                                    + " x "
                                                    + item.getQuantity())
                                    .collect(
                                            Collectors.joining(", "));

                    return new AdminOrderResponse(
                            bill.getBillId(),
                            bill.getUser().getUserCode(),
                            bill.getUser().getFullName(),
                            items,
                            bill.getTotalAmount(),
                            "PAID",
                            bill.getBillDate()
                    );

                })
                .toList();
    }
    @Override
    public List<BillingCorrectionItemResponse> getBillItemsForCorrection(
            Long billId) {

        Bill bill = billRepository
                .findById(billId)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found"));

        LocalDate billDate =
                bill.getBillDate().toLocalDate();

        if (!billDate.equals(LocalDate.now())) {
            throw new RuntimeException(
                    "Only today's bills can be corrected");
        }

        return bill.getBillItems()
                .stream()
                .map(item -> {

                    int billedQuantity =
                            item.getQuantity();

                    int correctedQuantity =
                            item.getCorrectedQuantity();

                    int remainingQuantity =
                            billedQuantity - correctedQuantity;

                    return new BillingCorrectionItemResponse(
                            item.getFood().getFoodId(),
                            item.getFood().getFoodName(),
                            billedQuantity,
                            correctedQuantity,
                            remainingQuantity,
                            item.getPrice()
                    );
                })
                .toList();
    }

    @Transactional
    @Override
    public void correctBilling(BillingCorrectionRequest request) {

        if (request.getBillId() == null) {
            throw new RuntimeException("Bill ID is required");
        }

        if (request.getFoodId() == null) {
            throw new RuntimeException("Food ID is required");
        }

        if (request.getCorrectionQuantity() == null ||
                request.getCorrectionQuantity() <= 0) {

            throw new RuntimeException(
                    "Correction quantity must be greater than zero");
        }

        Bill bill = billRepository
                .findById(request.getBillId())
                .orElseThrow(() ->
                        new RuntimeException("Bill not found"));

        LocalDate billDate =
                bill.getBillDate().toLocalDate();

        if (!billDate.equals(LocalDate.now())) {

            throw new RuntimeException(
                    "Billing correction is allowed only for today's bills");
        }

        User user = bill.getUser();

        if (user.getStatus() != UserStatus.ACTIVE) {

            throw new RuntimeException(
                    "Cannot correct billing for an inactive user");
        }

        Wallet wallet = walletRepository
                .findByUserUserCode(user.getUserCode())
                .orElseThrow(() ->
                        new RuntimeException("Wallet not found"));

        BillItem selectedItem =
                bill.getBillItems()
                        .stream()
                        .filter(item ->
                                item.getFood()
                                        .getFoodId()
                                        .equals(request.getFoodId()))
                        .findFirst()
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Food item not found in this bill"));

        int billedQuantity =
                selectedItem.getQuantity();

        int correctionQuantity =
                request.getCorrectionQuantity();

        if (correctionQuantity > billedQuantity) {

            throw new RuntimeException(
                    "Correction quantity cannot be greater than billed quantity");
        }

        double restoreAmount =
                selectedItem.getPrice() * correctionQuantity;


        // Restore money to wallet
        wallet.setBalance(
                wallet.getBalance() + restoreAmount);

        walletRepository.save(wallet);


        /*
         * IMPORTANT:
         * If the complete item is corrected, remove it
         * from the Bill collection BEFORE deleting it.
         */
        if (correctionQuantity == billedQuantity) {

            bill.getBillItems().remove(selectedItem);

            billItemRepository.delete(selectedItem);

        } else {

            selectedItem.setQuantity(
                    billedQuantity - correctionQuantity);

            billItemRepository.save(selectedItem);
        }


        // Update bill total
        double newBillTotal =
                bill.getTotalAmount() - restoreAmount;

        bill.setTotalAmount(newBillTotal);

        billRepository.save(bill);


        // Save wallet history
        WalletHistory history =
                new WalletHistory();

        history.setWallet(wallet);

        history.setTransactionType(
                TransactionType.BILL_CORRECTION);

        history.setAmount(restoreAmount);

        history.setBalanceAfterTransaction(
                wallet.getBalance());

        history.setTransactionDate(
                LocalDateTime.now());

        walletHistoryRepository.save(history);
    }

    @Override
    public List<TodayBillResponse> getTodayBills(String userCode) {

        LocalDate today = LocalDate.now();

        List<Bill> bills =
                billRepository.findByUserUserCodeAndBillDateBetweenOrderByBillDateDesc(
                        userCode,
                        today.atStartOfDay(),
                        today.plusDays(1).atStartOfDay()
                );

        return bills.stream()
                .map(bill -> new TodayBillResponse(
                        bill.getBillId(),
                        bill.getUser().getUserCode(),
                        bill.getUser().getFullName(),
                        bill.getTotalAmount(),
                        bill.getBillDate()
                ))
                .toList();
    }
    @Override
    public List<BillingHistoryResponse> getBillingHistory(
            String userCode) {

        List<Bill> bills =
                billRepository
                        .findByUserUserCodeOrderByBillDateDesc(
                                userCode);

        return bills.stream()
                .map(bill -> {

                    String items =
                            bill.getBillItems()
                                    .stream()
                                    .map(item ->
                                            item.getFood()
                                                    .getFoodName()
                                                    + " x "
                                                    + item.getQuantity())
                                    .collect(
                                            Collectors.joining(", ")
                                    );

                    return new BillingHistoryResponse(
                            bill.getBillId(),
                            bill.getUser().getUserCode(),
                            bill.getUser().getFullName(),
                            bill.getTotalAmount(),
                            bill.getBillDate(),
                            items
                    );
                })
                .toList();
    }
}