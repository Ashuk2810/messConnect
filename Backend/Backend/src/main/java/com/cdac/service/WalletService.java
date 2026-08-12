package com.cdac.service;

import java.util.List;

import com.cdac.dto.BalanceResponse;
import com.cdac.dto.RechargeRequest;
import com.cdac.dto.RechargeResponse;
import com.cdac.dto.WalletHistoryResponse;

public interface WalletService {

    RechargeResponse rechargeWallet(RechargeRequest request);

    BalanceResponse getBalance(String userCode);

    List<WalletHistoryResponse> getWalletHistory(String userCode);

}