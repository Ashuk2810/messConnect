package com.cdac.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.RefundRequestDTO;
import com.cdac.dto.RefundResponseDTO;
import com.cdac.service.RefundService;

@RestController
@RequestMapping("/refund")
public class RefundController {

    @Autowired
    private RefundService refundService;

    // ==========================
    // BILLING STAFF
    // ==========================
    @PostMapping("/request")
    @PreAuthorize("hasAuthority('BILLING_STAFF')")
    public RefundResponseDTO createRefundRequest(
            @RequestBody RefundRequestDTO request,
            Principal principal) {

        return refundService.createRefundRequest(
                request,
                principal.getName()
        );
    }

    // ==========================
    // ADMIN
    // ==========================
    @GetMapping("/pending")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<RefundResponseDTO> getPendingRefundRequests() {

        return refundService.getPendingRefundRequests();
    }

    @PutMapping("/{refundId}/approve")
    @PreAuthorize("hasAuthority('ADMIN')")
    public RefundResponseDTO approveRefund(
            @PathVariable Long refundId,
            Principal principal) {

        return refundService.approveRefund(
                refundId,
                principal.getName()
        );
    }

    @PutMapping("/{refundId}/reject")
    @PreAuthorize("hasAuthority('ADMIN')")
    public RefundResponseDTO rejectRefund(
            @PathVariable Long refundId,
            Principal principal) {

        return refundService.rejectRefund(
                refundId,
                principal.getName()
        );
    }

    // ==========================
    // USER
    // ==========================
    @GetMapping("/my-history")
    @PreAuthorize("hasAuthority('USER')")
    public List<RefundResponseDTO> getMyRefundHistory(
            Principal principal) {

        return refundService.getMyRefundHistory(
                principal.getName()
        );
    }

}