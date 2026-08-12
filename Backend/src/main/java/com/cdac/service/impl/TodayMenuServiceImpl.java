package com.cdac.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.TodayMenuResponse;
import com.cdac.entity.Food;
import com.cdac.entity.TodayMenu;
import com.cdac.enums.FoodCategory;
import com.cdac.repository.FoodRepository;
import com.cdac.repository.TodayMenuRepository;
import com.cdac.service.TodayMenuService;

@Service
public class TodayMenuServiceImpl implements TodayMenuService {

    @Autowired
    private TodayMenuRepository todayMenuRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public TodayMenuResponse addToTodayMenu(
            Long foodId,
            FoodCategory category) {

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));

        LocalDate today = LocalDate.now();

        if (todayMenuRepository
                .findByFoodAndCategoryAndMenuDate(
                        food,
                        category,
                        today)
                .isPresent()) {

            throw new RuntimeException(
                    "Food already added to today's menu for this category");
        }

        TodayMenu todayMenu = new TodayMenu();

        todayMenu.setFood(food);
        todayMenu.setCategory(category);
        todayMenu.setMenuDate(today);

        TodayMenu saved = todayMenuRepository.save(todayMenu);

        return mapToResponse(saved);
    }

    @Override
    public void removeFromTodayMenu(Long menuId) {

        TodayMenu menu = todayMenuRepository.findById(menuId)
                .orElseThrow(() ->
                        new RuntimeException("Today's menu item not found"));

        todayMenuRepository.delete(menu);
    }

    @Override
    public List<TodayMenuResponse> getTodayMenu() {

        LocalDate today = LocalDate.now();

        return todayMenuRepository
                .findByMenuDateOrderByCategoryAscMenuIdAsc(today)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private TodayMenuResponse mapToResponse(TodayMenu menu) {

        TodayMenuResponse response = new TodayMenuResponse();

        response.setMenuId(menu.getMenuId());
        response.setFoodId(menu.getFood().getFoodId());
        response.setFoodName(menu.getFood().getFoodName());
        response.setCategory(menu.getCategory());
        response.setPrice(menu.getFood().getPrice());
        response.setMenuDate(menu.getMenuDate());

        return response;
    }
}