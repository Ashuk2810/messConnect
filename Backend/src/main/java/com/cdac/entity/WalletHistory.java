package com.cdac.entity;

import java.time.LocalDateTime;

import com.cdac.enums.TransactionType;

import jakarta.persistence.*;

@Entity
@Table(name="wallet_history")
public class WalletHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long historyId;
	
	@ManyToOne
	@JoinColumn(name="wallet_id")
	private Wallet wallet;
	
	@Enumerated(EnumType.STRING)
	private TransactionType transactionType;
	
	private Double amount;
	private Double balanceAfterTransaction;
	private LocalDateTime transactionDate;
	
	public WalletHistory() {
		
	}

	public Long getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Long historyId) {
		this.historyId = historyId;
	}

	public Wallet getWallet() {
		return wallet;
	}

	public void setWallet(Wallet wallet) {
		this.wallet = wallet;
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getBalanceAfterTransaction() {
		return balanceAfterTransaction;
	}

	public void setBalanceAfterTransaction(Double balanceAfterTransaction) {
		this.balanceAfterTransaction = balanceAfterTransaction;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}
	
	
	
	
	

}
