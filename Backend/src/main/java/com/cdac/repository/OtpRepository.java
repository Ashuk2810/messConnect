package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Otp;
import com.cdac.entity.User;


@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

	
	
	Optional<Otp> findTopByUserOrderByExpiryTimeDesc(User user);

}
