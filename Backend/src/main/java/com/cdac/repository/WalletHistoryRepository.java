package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.WalletHistory;
import com.cdac.entity.Wallet;

public interface WalletHistoryRepository extends JpaRepository<WalletHistory, Long> {

    List<WalletHistory> findByWalletOrderByTransactionDateDesc(Wallet wallet);

}