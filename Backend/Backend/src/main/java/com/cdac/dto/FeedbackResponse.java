package com.cdac.dto;

import java.time.LocalDateTime;

public class FeedbackResponse {

    private Long feedbackId;

    private String userCode;

    private String foodName;

    private Integer rating;

    private String comment;

    private LocalDateTime feedbackDate;

    private String message;

    public FeedbackResponse() {
    }

    public FeedbackResponse(Long feedbackId, String userCode, String foodName,
            Integer rating, String comment,
            LocalDateTime feedbackDate, String message) {

        this.feedbackId = feedbackId;
        this.userCode = userCode;
        this.foodName = foodName;
        this.rating = rating;
        this.comment = comment;
        this.feedbackDate = feedbackDate;
        this.message = message;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getFeedbackDate() {
        return feedbackDate;
    }

    public void setFeedbackDate(LocalDateTime feedbackDate) {
        this.feedbackDate = feedbackDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}