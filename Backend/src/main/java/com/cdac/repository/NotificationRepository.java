package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Notification;
import com.cdac.entity.User;

public interface NotificationRepository 
        extends JpaRepository<Notification, Long>{

    List<Notification> findByUserOrderByCreatedDateDesc(User user);

    Long countByUserAndIsReadFalse(User user);

}