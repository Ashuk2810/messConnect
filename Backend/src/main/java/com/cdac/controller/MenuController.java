package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.TodayMenuResponse;
import com.cdac.service.TodayMenuService;

@RestController
@RequestMapping("/api/user/menu")
public class MenuController {

    @Autowired
    private TodayMenuService todayMenuService;

    @GetMapping
    public List<TodayMenuResponse> getMenu() {

        return todayMenuService.getTodayMenu();
    }
}