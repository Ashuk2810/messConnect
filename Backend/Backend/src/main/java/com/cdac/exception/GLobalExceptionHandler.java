package com.cdac.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GLobalExceptionHandler {
	
	 @ExceptionHandler(RuntimeException.class)
	    public ResponseEntity<Map<String, String>> handleRuntimeException(
	            RuntimeException ex) {

	        Map<String, String> response = new HashMap<>();

	        response.put("message", ex.getMessage());

	        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	    }

}
