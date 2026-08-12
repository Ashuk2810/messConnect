package com.cdac.service;

import java.util.List;

import com.cdac.dto.TodayMenuResponse;
import com.cdac.enums.FoodCategory;

public interface TodayMenuService {

    TodayMenuResponse addToTodayMenu(
            Long foodId,
            FoodCategory category
    );

    void removeFromTodayMenu(Long menuId);

    List<TodayMenuResponse> getTodayMenu();

}