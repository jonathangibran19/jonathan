package com.xalyticsdigital.gbmonitoring.controllers;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;


@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {
    
    
    @ExceptionHandler(NoHandlerFoundException.class)
    public String handleAnyException() {
        return "redirect:/notfound";
    }
    
}
    