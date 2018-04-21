package com.xalyticsdigital.gbmonitoring.controllers;

import com.xalyticsdigital.gbmonitoring.services.ipfs.IpfsService;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/private")
public class PrivateController {

    @Autowired
    IpfsService ipfsService;

    // @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_DASHBOARD_USER')")
    @RequestMapping(value = "/privado", method = RequestMethod.GET)
    public ModelAndView getPrivado(Principal principal, @ModelAttribute("hash") final String hash, @ModelAttribute("link") final String link) {
        ModelAndView modelAndView = new ModelAndView("private/privado");
        System.out.println(hash);
        System.out.println(link);
        return modelAndView;
    }

    @RequestMapping(value = "/testsockets", method = RequestMethod.GET)
    public ModelAndView getTestSockets(Principal principal) {
        return new ModelAndView("private/testsockets");
    }

    @RequestMapping(value = "/sendfile", method = RequestMethod.GET)
    //public String sendFile(@RequestPart("foto") byte[] foto,
    public ModelAndView getSenFileView() {
        return new ModelAndView("private/sendfile");
    }

    @RequestMapping(value = "/sendfile", method = RequestMethod.POST)
    //public String sendFile(@RequestPart("foto") byte[] foto,
    public String sendFile(
            @RequestParam("foto") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {

        System.out.println("User home:" + System.getProperty("user.home"));
        String userHome = System.getProperty("user.home");

        System.out.println("Archivo recibido: " + file.getOriginalFilename());

        //FileUtils.writeByteArrayToFile(new File(userHome + "/" + file.getOriginalFilename()), file.getBytes());
        String hash = ipfsService.uploadFileToIpfs(file.getBytes(), file.getOriginalFilename());

        redirectAttributes.addFlashAttribute("hash", hash);

        return "redirect:/private/privado";
    }

    @RequestMapping(value = "/downloadfile", method = RequestMethod.POST)
    //public String sendFile(@RequestPart("foto") byte[] foto,
    public String downloadFile(
            @RequestParam("hash") String hash, RedirectAttributes redirectAttributes) throws IOException {

        String url = ipfsService.downloadFile(hash);

        redirectAttributes.addFlashAttribute("link", hash);

        return "redirect:/private/privado";
    }

}
