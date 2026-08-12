package com.cdac.service;

import java.util.List;

import com.cdac.dto.FoodRequest;
import com.cdac.dto.FoodResponse;

public interface FoodService {

    FoodResponse addFood(FoodRequest request);

    FoodResponse updateFood(
            Long foodId,
            FoodRequest request
    );

    void deleteFood(Long foodId);

    List<FoodResponse> getAllFoods();

    List<FoodResponse> searchFood(String name);
}