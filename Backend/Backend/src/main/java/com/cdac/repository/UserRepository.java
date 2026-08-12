package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.User;
import com.cdac.enums.UserType;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserCode(String userCode);
    
    Optional<User> findByEmail(String email);

    Optional<User> findTopByUserCodeStartingWithOrderByUserCodeDesc(String prefix);

    Long countByUserType(UserType userType);
}