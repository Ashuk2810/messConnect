package com.cdac.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.TodayMenu;
import com.cdac.entity.Food;
import com.cdac.enums.FoodCategory;

public interface TodayMenuRepository extends JpaRepository<TodayMenu, Long> {

    List<TodayMenu> findByMenuDateOrderByCategoryAscMenuIdAsc(
            LocalDate menuDate
    );

    Optional<TodayMenu> findByFoodAndCategoryAndMenuDate(
            Food food,
            FoodCategory category,
            LocalDate menuDate
    );

    List<TodayMenu> findByFood(Food food);
}