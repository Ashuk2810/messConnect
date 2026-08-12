package com.cdac.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.FeedbackRequest;
import com.cdac.dto.FeedbackResponse;
import com.cdac.entity.Feedback;
import com.cdac.entity.Food;
import com.cdac.entity.User;
import com.cdac.repository.FeedbackRepository;
import com.cdac.repository.FoodRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    //submit feedback
    @Override
    public FeedbackResponse submitFeedback(String userCode, FeedbackRequest request) {

        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Food food = foodRepository.findById(request.getFoodId())
                .orElseThrow(() -> new RuntimeException("Food not found"));

        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        Feedback feedback = new Feedback();

        feedback.setUser(user);
        feedback.setFood(food);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setFeedbackDate(LocalDateTime.now());
        feedback.setIsViewed(false);

        Feedback savedFeedback = feedbackRepository.save(feedback);

        return new FeedbackResponse(
                savedFeedback.getFeedbackId(),
                user.getUserCode(),
                food.getFoodName(),
                savedFeedback.getRating(),
                savedFeedback.getComment(),
                savedFeedback.getFeedbackDate(),
                "Feedback submitted successfully");
    }

    // get all my feedback
    @Override
    public List<FeedbackResponse> getMyFeedback(String userCode) {

        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Feedback> feedbackList = feedbackRepository.findByUser(user);

        List<FeedbackResponse> responseList = new ArrayList<>();

        for (Feedback feedback : feedbackList) {

            FeedbackResponse response = new FeedbackResponse(
                    feedback.getFeedbackId(),
                    user.getUserCode(),
                    feedback.getFood().getFoodName(),
                    feedback.getRating(),
                    feedback.getComment(),
                    feedback.getFeedbackDate(),
                    "Success");

            responseList.add(response);
        }

        return responseList;
    }
// get all feed back 
    @Override
    public List<FeedbackResponse> getAllFeedback() {

        List<Feedback> feedbackList = feedbackRepository.findAll();

        List<FeedbackResponse> responseList = new ArrayList<>();

        for (Feedback feedback : feedbackList) {

            FeedbackResponse response = new FeedbackResponse(
                    feedback.getFeedbackId(),
                    feedback.getUser().getUserCode(),
                    feedback.getFood().getFoodName(),
                    feedback.getRating(),
                    feedback.getComment(),
                    feedback.getFeedbackDate(),
                    "Success");

            responseList.add(response);
        }

        return responseList;
    }

    // get feed back by food item
    @Override
    public List<FeedbackResponse> getFeedbackByFood(Long foodId) {

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        List<Feedback> feedbackList = feedbackRepository.findByFood(food);

        List<FeedbackResponse> responseList = new ArrayList<>();

        for (Feedback feedback : feedbackList) {

            FeedbackResponse response = new FeedbackResponse(
                    feedback.getFeedbackId(),
                    feedback.getUser().getUserCode(),
                    food.getFoodName(),
                    feedback.getRating(),
                    feedback.getComment(),
                    feedback.getFeedbackDate(),
                    "Success");

            responseList.add(response);
        }

        return responseList;
    }
    @Override
    public Long getUnreadFeedbackCount() {

        return feedbackRepository.countByIsViewedFalse();

    }



    @Override
    public void markFeedbackViewed() {


        List<Feedback> list =
                feedbackRepository.findAll();


        for(Feedback feedback : list){

            feedback.setIsViewed(true);

        }


        feedbackRepository.saveAll(list);

    }
}