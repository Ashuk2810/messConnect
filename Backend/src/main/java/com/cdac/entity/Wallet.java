package com.cdac.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="wallet")
@Getter
@Setter

public class Wallet {
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long walletId;
	
	private Double Balance= 0.0;
	private Double lowBalanceThreshold =600.0;
	
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;

	public Long getWalletId() {
		return walletId;
	}

	public void setWalletId(Long walletId) {
		this.walletId = walletId;
	}

	public Double getBalance() {
		return Balance;
	}

	public void setBalance(Double balance) {
		Balance = balance;
	}

	public Double getLowBalanceThreshold() {
		return lowBalanceThreshold;
	}

	public void setLowBalanceThreshold(Double lowBalanceThreshold) {
		this.lowBalanceThreshold = lowBalanceThreshold;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	

}
