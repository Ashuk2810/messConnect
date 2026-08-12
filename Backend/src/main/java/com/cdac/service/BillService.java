package com.cdac.service;

import java.util.List;

import com.cdac.dto.AdminOrderResponse;
import com.cdac.dto.BillRequest;
import com.cdac.dto.BillResponse;
import com.cdac.dto.RecentMealResponse;
import com.cdac.dto.BillingCorrectionRequest;
import com.cdac.dto.BillingHistoryResponse;
import com.cdac.dto.TodayBillResponse;
import com.cdac.dto.BillingCorrectionItemResponse;

public interface BillService {

    BillResponse generateBill(BillRequest request);

    List<RecentMealResponse> getRecentMeals(String userCode);

    List<AdminOrderResponse> getAllOrders();

    List<TodayBillResponse> getTodayBills(String userCode);

    List<BillingCorrectionItemResponse> getBillItemsForCorrection(
            Long billId);

    List<BillingHistoryResponse> getBillingHistory(String userCode);
    void correctBilling(BillingCorrectionRequest request);
}