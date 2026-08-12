package com.cdac.service;

import java.util.List;

import com.cdac.dto.NotificationResponseDTO;
import com.cdac.entity.User;

public interface NotificationService {

    List<NotificationResponseDTO> getMyNotifications(String userCode);

    NotificationResponseDTO markAsRead(Long notificationId);

    void createNotification(User user, String message);

    Long getUnreadCount(String userCode);

}