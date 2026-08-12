package com.cdac.dto;

import com.cdac.enums.FoodCategory;

public class FoodResponse {
	
	 private Long foodId;
	    private String foodName;
	    private FoodCategory category;
	    private Double price;

	    public FoodResponse() {
	    }

		public Long getFoodId() {
			return foodId;
		}

		public void setFoodId(Long foodId) {
			this.foodId = foodId;
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
