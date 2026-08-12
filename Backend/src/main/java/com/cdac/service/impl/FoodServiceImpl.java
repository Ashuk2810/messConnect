package com.cdac.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.FoodRequest;
import com.cdac.dto.FoodResponse;
import com.cdac.entity.Food;
import com.cdac.repository.FoodRepository;
import com.cdac.service.FoodService;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public FoodResponse addFood(FoodRequest request) {

        if (foodRepository
                .findByFoodName(request.getFoodName())
                .isPresent()) {

            throw new RuntimeException(
                    "Food already present");
        }

        Food food = new Food();

        food.setFoodName(request.getFoodName());
        food.setCategory(request.getCategory());
        food.setPrice(request.getPrice());

        Food savedFood = foodRepository.save(food);

        return mapToResponse(savedFood);
    }

    @Override
    public FoodResponse updateFood(
            Long foodId,
            FoodRequest request) {

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));

        food.setFoodName(request.getFoodName());
        food.setCategory(request.getCategory());
        food.setPrice(request.getPrice());

        Food updatedFood = foodRepository.save(food);

        return mapToResponse(updatedFood);
    }

    @Override
    public void deleteFood(Long foodId) {

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));

        foodRepository.delete(food);
    }

    @Override
    public List<FoodResponse> getAllFoods() {

        return foodRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<FoodResponse> searchFood(String name) {

        return foodRepository
                .findByFoodNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private FoodResponse mapToResponse(Food food) {

        FoodResponse response = new FoodResponse();

        response.setFoodId(food.getFoodId());
        response.setFoodName(food.getFoodName());
        response.setCategory(food.getCategory());
        response.setPrice(food.getPrice());

        return response;
    }
}