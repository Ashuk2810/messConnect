package com.cdac.dto;

import com.cdac.enums.FoodCategory;

public class FoodRequest {
	
	private String foodName;
	private FoodCategory category;
	private Double price;
	
	
	public FoodRequest() {
		
	}


	public String getFoodName() {
		return foodName;
	}


	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}


	public FoodCategory getCategory() {
		return category;
	}


	public void setCategory(FoodCategory category) {
		this.category = category;
	}


	public Double getPrice() {
		return price;
	}


	public void setPrice(Double price) {
		this.price = price;
	}

	
}
