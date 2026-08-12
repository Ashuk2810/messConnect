package com.cdac.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;


    private Integer rating;


    @Column(length = 500)
    private String comment;


    private LocalDateTime feedbackDate;


    private Boolean isViewed = false;



    public Feedback() {
    }



    public Long getFeedbackId() {
        return feedbackId;
    }


    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }



    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }



    public Food getFood() {
        return food;
    }


    public void setFood(Food food) {
        this.food = food;
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



    public Boolean getIsViewed() {
        return isViewed;
    }


    public void setIsViewed(Boolean isViewed) {
        this.isViewed = isViewed;
    }

}