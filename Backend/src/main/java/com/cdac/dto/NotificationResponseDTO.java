package com.cdac.dto;

import java.time.LocalDateTime;

public class NotificationResponseDTO {


    private Long notificationId;

    private String message;

    private Boolean isRead;

    private LocalDateTime createdDate;


    public NotificationResponseDTO() {
    }


    public Long getNotificationId() {
        return notificationId;
    }


    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }


    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }


    public Boolean getIsRead() {
        return isRead;
    }


    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }


    public LocalDateTime getCreatedDate() {
        return createdDate;
    }


    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}