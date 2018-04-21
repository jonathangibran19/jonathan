package com.xalyticsdigital.gbmonitoring.initializers;

import com.xalyticsdigital.gbmonitoring.config.MvcAppConfiguration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration;

public class SpringMvcInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    private static String LOCATION;//"C:/temp/"; // Temporary location where files will be stored

    private static final long MAX_FILE_SIZE = 1048576 * 50; // 50MB : Max file size.
    // Beyond that size spring will throw exception.
    private static final long MAX_REQUEST_SIZE = 1048576 * 70; // 70MB : Total request size containing Multi part.

    private static final int FILE_SIZE_THRESHOLD = 0; // Size threshold after which files will be written to disk

    //private ServletContext servletContext;
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{MvcAppConfiguration.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return null;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        registration.setInitParameter("throwExceptionIfNoHandlerFound", "true");
        registration.setMultipartConfig(getMultipartConfigElement());
    }
//
//    private MultipartConfigElement getMultipartConfigElement() {
//        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(LOCATION, MAX_FILE_SIZE, MAX_REQUEST_SIZE, FILE_SIZE_THRESHOLD);
//        return multipartConfigElement;
//    }

    private MultipartConfigElement getMultipartConfigElement() {
        System.out.println("getMultipartConfigElement" + System.getProperty("user.home"));
        String home = System.getProperty("user.home");
        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(home + "/genoblock/uploads");
        return multipartConfigElement;
    }

}
