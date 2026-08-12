package com.cdac.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.NotificationResponseDTO;
import com.cdac.service.NotificationService;


@RestController
@RequestMapping("/api/notifications")
public class NotificationController {


    @Autowired
    private NotificationService notificationService;



    @GetMapping("/my")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN','BILLING_STAFF')")
    public List<NotificationResponseDTO> getMyNotifications(
            Principal principal) {


        return notificationService
                .getMyNotifications(principal.getName());

    }



    @GetMapping("/unread-count")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN','BILLING_STAFF')")
    public Long getUnreadCount(
            Principal principal) {


        return notificationService
                .getUnreadCount(principal.getName());

    }



    @PutMapping("/{id}/read")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN','BILLING_STAFF')")
    public NotificationResponseDTO markAsRead(
            @PathVariable Long id) {


        return notificationService.markAsRead(id);

    }

}