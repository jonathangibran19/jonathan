package com.xalyticsdigital.gbmonitoring.controllers;

import java.security.Principal;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SessionController {

    @RequestMapping(value = {"/private", "/private/"}, method = RequestMethod.GET)
    public ModelAndView getViewUser(Principal principal, HttpServletRequest request) {
        /*Si existe una sesion abierta no puede acceder al formulario de registro*/
        if (principal != null) {
            if (request.isUserInRole("DASHBOARD_USER")) {
                return new ModelAndView("redirect:/private/privado");
            } else if (request.isUserInRole("ADMIN")) {
                return new ModelAndView("redirect:/private/privado");
            }
        }
        ModelAndView model = new ModelAndView("redirect:login");

        return model;
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public ModelAndView getLogIn(Principal principal, HttpServletRequest request,
            @RequestParam(required = false, name = "error") String error) {
        /*Si existe una sesion abierta no puede acceder al formulario de inicio de sesion*/
        if (principal != null) {
            if (request.isUserInRole("DASHBOARD_USER")) {
                return new ModelAndView("redirect:private/privado");
            } else if (request.isUserInRole("ADMIN")) {
                return new ModelAndView("redirect:private/privado");
            }
        }
        ModelAndView model = new ModelAndView("public/login");
        if (error != null) {
            model.addObject("error", "usuario o contasena incorrectos");
        }
        return model;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/?logout";
    }

}
