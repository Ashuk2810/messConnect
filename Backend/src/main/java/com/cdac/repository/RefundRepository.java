package com.cdac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Bill;
import com.cdac.entity.Refund;
import com.cdac.entity.User;
import com.cdac.enums.RefundStatus;

public interface RefundRepository extends JpaRepository<Refund, Long> {

	List<Refund> findByStatusOrderByRequestDateAsc(RefundStatus status);

    List<Refund> findByUser(User user);

    Optional<Refund> findByBill(Bill bill);

    boolean existsByBill(Bill bill);
    
    Long countByStatus(RefundStatus status);

}