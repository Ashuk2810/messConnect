package com.cdac.service;

import java.util.List;

import com.cdac.dto.FeedbackRequest;
import com.cdac.dto.FeedbackResponse;


public interface FeedbackService {


    FeedbackResponse submitFeedback(
            String userCode,
            FeedbackRequest request);



    List<FeedbackResponse> getMyFeedback(
            String userCode);



    List<FeedbackResponse> getAllFeedback();



    List<FeedbackResponse> getFeedbackByFood(
            Long foodId);



    Long getUnreadFeedbackCount();



    void markFeedbackViewed();

}