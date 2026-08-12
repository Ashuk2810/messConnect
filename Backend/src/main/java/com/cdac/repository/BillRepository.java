package com.cdac.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Bill;
import com.cdac.entity.User;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    Long countByBillDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.billDate BETWEEN :start AND :end
    """)
    Double getTodayRevenue(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.billDate BETWEEN :start AND :end
    """)
    Double getMonthlyRevenue(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("""
        SELECT COUNT(DISTINCT b.user.userId)
        FROM Bill b
        WHERE b.billDate BETWEEN :start AND :end
    """)
    Long countStudentsServedToday(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    List<Bill> findTop10ByUserUserCodeOrderByBillDateDesc(
            String userCode
    );

    List<Bill> findByUserUserCodeOrderByBillDateDesc(
            String userCode
    );

    List<Bill> findByUserUserCodeAndBillDateBetweenOrderByBillDateDesc(
            String userCode,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Bill> findAllByOrderByBillDateDesc();
}