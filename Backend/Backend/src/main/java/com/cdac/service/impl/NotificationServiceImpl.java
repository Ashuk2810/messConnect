package com.cdac.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.NotificationResponseDTO;
import com.cdac.entity.Notification;
import com.cdac.entity.User;
import com.cdac.repository.NotificationRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.NotificationService;


@Service
public class NotificationServiceImpl implements NotificationService {


    @Autowired
    private NotificationRepository notificationRepository;


    @Autowired
    private UserRepository userRepository;



    @Override
    public List<NotificationResponseDTO> getMyNotifications(String userCode) {


        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("User not found"));


        return notificationRepository
                .findByUserOrderByCreatedDateDesc(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

    }



    @Override
    public NotificationResponseDTO markAsRead(Long notificationId) {


        Notification notification =
                notificationRepository.findById(notificationId)
                .orElseThrow(() -> 
                new RuntimeException("Notification not found"));


        notification.setIsRead(true);


        Notification saved =
                notificationRepository.save(notification);


        return mapToDTO(saved);

    }



    @Override
    public void createNotification(User user, String message) {


        Notification notification = new Notification();


        notification.setUser(user);

        notification.setMessage(message);

        notification.setIsRead(false);

        notification.setCreatedDate(LocalDateTime.now());


        notificationRepository.save(notification);

    }



    @Override
    public Long getUnreadCount(String userCode) {


        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> 
                new RuntimeException("User not found"));


        return notificationRepository
                .countByUserAndIsReadFalse(user);

    }




    private NotificationResponseDTO mapToDTO(Notification notification) {


        NotificationResponseDTO dto =
                new NotificationResponseDTO();


        dto.setNotificationId(
                notification.getNotificationId()
        );


        dto.setMessage(
                notification.getMessage()
        );


        dto.setIsRead(
                notification.getIsRead()
        );


        dto.setCreatedDate(
                notification.getCreatedDate()
        );


        return dto;

    }

}