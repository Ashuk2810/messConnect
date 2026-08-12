
package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

    Optional<Wallet> findByUserUserCode(String userCode);

    @Query("SELECT COALESCE(SUM(w.Balance), 0) FROM Wallet w")
    Double getTotalWalletBalance();

}

