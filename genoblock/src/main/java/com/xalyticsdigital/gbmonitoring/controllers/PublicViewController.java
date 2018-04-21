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
    
    @RequestMapping(value = {"/sesion"})
    public ModelAndView getLogin() {
        return new ModelAndView("public/login");
    }
    
    @RequestMapping(value = {"/registro"})
    public ModelAndView getRegistro() {
        return new ModelAndView("public/registry");
    }
    
    @RequestMapping(value = {"/verificacion"})
    public ModelAndView getVerifica() {
        return new ModelAndView("public/verifyregistry");
    }

    @RequestMapping(value = {"/notfound"})
    public ModelAndView getContentNotFound() {
        return new ModelAndView("public/notfound");
    }

}
