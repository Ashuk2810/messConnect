package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.entity.Feedback;
import com.cdac.entity.Food;
import com.cdac.entity.User;


public interface FeedbackRepository 
        extends JpaRepository<Feedback, Long> {


    List<Feedback> findByUser(User user);


    List<Feedback> findByFood(Food food);


    List<Feedback> findByRating(Integer rating);



    @Query("SELECT COALESCE(AVG(f.rating),0) FROM Feedback f")
    Double getAverageRating();



    Long countByIsViewedFalse();


}