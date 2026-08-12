package com.cdac.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;


    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;


    private String message;

    

    private Boolean isRead = false;


    private LocalDateTime createdDate;


    public Notification() {
    }


    public Long getNotificationId() {
        return notificationId;
    }


    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
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