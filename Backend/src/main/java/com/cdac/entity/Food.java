package com.cdac.entity;

import com.cdac.enums.FoodCategory;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;

@Entity
@Table(name= "food")
public class Food {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long foodId;
	
	
	@Column(nullable =false, unique =true)
	private String foodName;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable=false)
	private FoodCategory category;
	
	@Column(nullable=false)
	private Double Price;
	
	public Food() {
		
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
		return Price;
	}

	public void setPrice(Double price) {
		Price = price;
	}
	
	
	
	



	
}
