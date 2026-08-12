package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.BalanceResponse;
import com.cdac.dto.RechargeRequest;
import com.cdac.dto.RechargeResponse;
import com.cdac.service.WalletService;
import java.util.List;
import com.cdac.dto.WalletHistoryResponse;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

@Autowired
private WalletService walletService;

@PostMapping("/recharge")
@PreAuthorize("hasAuthority('ADMIN')")
public RechargeResponse rechargeWallet(
        @RequestBody RechargeRequest request) {

    return walletService.rechargeWallet(request);
}

@GetMapping("/balance/{userCode}")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN', 'BILLING_STAFF')")
public BalanceResponse getBalance(
        @PathVariable String userCode) {

    return walletService.getBalance(userCode);
}
@GetMapping("/history/{userCode}")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
public List<WalletHistoryResponse> getWalletHistory(
        @PathVariable String userCode) {

    return walletService.getWalletHistory(userCode);
}

}
