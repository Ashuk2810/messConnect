package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.TodayMenuResponse;
import com.cdac.enums.FoodCategory;
import com.cdac.service.TodayMenuService;

@RestController
@RequestMapping("/api/admin/menu")
public class AdminMenuController {

    @Autowired
    private TodayMenuService todayMenuService;

    @GetMapping
    public List<TodayMenuResponse> getTodayMenu() {

        return todayMenuService.getTodayMenu();
    }

    @PostMapping("/add/{foodId}")
    public TodayMenuResponse addToTodayMenu(
            @PathVariable Long foodId,
            @RequestParam FoodCategory category) {

        return todayMenuService.addToTodayMenu(
                foodId,
                category
        );
    }

    @DeleteMapping("/remove/{menuId}")
    public String removeFromTodayMenu(
            @PathVariable Long menuId) {

        todayMenuService.removeFromTodayMenu(menuId);

        return "Food removed from today's menu successfully";
    }
}