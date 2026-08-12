package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.AdminOrderResponse;
import com.cdac.dto.BillRequest;
import com.cdac.dto.BillResponse;
import com.cdac.dto.BillingCorrectionRequest;
import com.cdac.dto.BillingHistoryResponse;
import com.cdac.dto.RecentMealResponse;
import com.cdac.service.BillService;
import com.cdac.dto.TodayBillResponse;
import com.cdac.dto.BillingCorrectionItemResponse;

@RestController
@RequestMapping("/api/billing")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/generate")
    public BillResponse generateBill(
            @RequestBody BillRequest request) {

        return billService.generateBill(request);
    }

    @GetMapping("/recent/{userCode}")
    public List<RecentMealResponse> getRecentMeals(
            @PathVariable String userCode) {

        return billService.getRecentMeals(userCode);
    }

    @GetMapping("/all")
    public List<AdminOrderResponse> getAllOrders() {

        return billService.getAllOrders();
    }

    @PostMapping("/correct")
    public String correctBilling(
            @RequestBody BillingCorrectionRequest request) {

        billService.correctBilling(request);

        return "Billing corrected successfully";
    }
    @GetMapping("/today/{userCode}")
    public List<TodayBillResponse> getTodayBills(
            @PathVariable String userCode) {

        return billService.getTodayBills(userCode);
    }
    @GetMapping("/correction/items/{billId}")
    public List<BillingCorrectionItemResponse> getBillItemsForCorrection(
            @PathVariable Long billId) {

        return billService.getBillItemsForCorrection(billId);
    }
    @GetMapping("/history/{userCode}")
    public List<BillingHistoryResponse> getBillingHistory(
            @PathVariable String userCode) {

        return billService.getBillingHistory(userCode);
    }
}