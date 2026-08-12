package com.cdac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {

    Optional<Food> findByFoodName(String foodName);

    List<Food> findByFoodNameContainingIgnoreCase(String foodName);
}