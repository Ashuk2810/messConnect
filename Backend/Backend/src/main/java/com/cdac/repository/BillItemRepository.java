package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.BillItem;

public interface BillItemRepository extends JpaRepository<BillItem, Long> {

    Optional<BillItem> findByBillBillIdAndFoodFoodId(
            Long billId,
            Long foodId
    );
}