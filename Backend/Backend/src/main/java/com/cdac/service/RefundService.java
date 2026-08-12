package com.cdac.service;

import java.util.List;

import com.cdac.dto.RefundRequestDTO;
import com.cdac.dto.RefundResponseDTO;

public interface RefundService {

    // Billing Staff
    RefundResponseDTO createRefundRequest(RefundRequestDTO request, String userCode);

    // Admin
    List<RefundResponseDTO> getPendingRefundRequests();

    RefundResponseDTO approveRefund(Long refundId, String adminUserCode);

    RefundResponseDTO rejectRefund(Long refundId, String adminUserCode);

    // User
    List<RefundResponseDTO> getMyRefundHistory(String userCode);

}
