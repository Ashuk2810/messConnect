package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.FoodRequest;
import com.cdac.dto.FoodResponse;
import com.cdac.service.FoodService;

@RestController
@RequestMapping("/api/admin/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping("/add")
    public FoodResponse addFood(
            @RequestBody FoodRequest request) {

        return foodService.addFood(request);
    }

    @PutMapping("/update/{foodId}")
    public FoodResponse updateFood(
            @PathVariable Long foodId,
            @RequestBody FoodRequest request) {

        return foodService.updateFood(foodId, request);
    }

    @DeleteMapping("/delete/{foodId}")
    public String deleteFood(
            @PathVariable Long foodId) {

        foodService.deleteFood(foodId);

        return "Food Deleted Successfully";
    }

    @GetMapping("/all")
    public List<FoodResponse> getAllFoods() {

        return foodService.getAllFoods();
    }

    @GetMapping("/search")
    public List<FoodResponse> searchFood(
            @RequestParam String name) {

        return foodService.searchFood(name);
    }
}