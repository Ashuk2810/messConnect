package com.cdac.dto;

public class BillingCorrectionItemResponse {

    private Long foodId;
    private String foodName;
    private Integer billedQuantity;
    private Integer correctedQuantity;
    private Integer remainingQuantity;
    private Double price;

    public BillingCorrectionItemResponse() {
    }

    public BillingCorrectionItemResponse(
            Long foodId,
            String foodName,
            Integer billedQuantity,
            Integer correctedQuantity,
            Integer remainingQuantity,
            Double price) {

        this.foodId = foodId;
        this.foodName = foodName;
        this.billedQuantity = billedQuantity;
        this.correctedQuantity = correctedQuantity;
        this.remainingQuantity = remainingQuantity;
        this.price = price;
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

    public Integer getBilledQuantity() {
        return billedQuantity;
    }

    public void setBilledQuantity(Integer billedQuantity) {
        this.billedQuantity = billedQuantity;
    }

    public Integer getCorrectedQuantity() {
        return correctedQuantity;
    }

    public void setCorrectedQuantity(Integer correctedQuantity) {
        this.correctedQuantity = correctedQuantity;
    }

    public Integer getRemainingQuantity() {
        return remainingQuantity;
    }

    public void setRemainingQuantity(Integer remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}