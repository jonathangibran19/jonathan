package com.xalyticsdigital.gbmonitoring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PublicViewController {

    @RequestMapping(value = {"/inicio", "/"})
    public ModelAndView getInicio() {
        return new ModelAndView("public/index");
    }

    @RequestMapping(value = {"/notfound"})
    public ModelAndView getContentNotFound() {
        return new ModelAndView("public/notfound");
    }

}
