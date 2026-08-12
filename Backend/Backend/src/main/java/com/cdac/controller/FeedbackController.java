package com.cdac.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.FeedbackRequest;
import com.cdac.dto.FeedbackResponse;
import com.cdac.service.FeedbackService;


@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {


    @Autowired
    private FeedbackService feedbackService;



    @PostMapping("/submit")
    public FeedbackResponse submitFeedback(
            org.springframework.security.core.Authentication authentication,
            @RequestBody FeedbackRequest request) {


        return feedbackService.submitFeedback(
                authentication.getName(),
                request
        );

    }




    @GetMapping("/my")
    public List<FeedbackResponse> getMyFeedback(
            org.springframework.security.core.Authentication authentication) {


        return feedbackService.getMyFeedback(
                authentication.getName()
        );

    }





    @GetMapping("/all")
    public List<FeedbackResponse> getAllFeedback() {


        return feedbackService.getAllFeedback();

    }




    @GetMapping("/unread-count")
    public Long getUnreadCount(){


        return feedbackService.getUnreadFeedbackCount();

    }





    @PutMapping("/viewed")
    public String markViewed(){


        feedbackService.markFeedbackViewed();


        return "Feedback viewed";

    }


}