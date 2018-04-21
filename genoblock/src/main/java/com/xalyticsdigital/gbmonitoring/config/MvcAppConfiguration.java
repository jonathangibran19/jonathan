package com.xalyticsdigital.gbmonitoring.config;

import com.xalyticsdigital.gbmonitoring.components.HibernateConfig;
import com.xalyticsdigital.gbmonitoring.components.SecurityConfig;
import com.xalyticsdigital.gbmonitoring.components.WebSocketConfig;
import java.io.File;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.mvc.WebContentInterceptor;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.TemplateResolver;

@Configuration
@ComponentScan(basePackages = "com.xalyticsdigital.*")
@EnableWebMvc
@EnableScheduling
@Import({HibernateConfig.class, WebSocketConfig.class, SecurityConfig.class})
public class MvcAppConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**").addResourceLocations("/WEB-INF/resources/css/");
        registry.addResourceHandler("/js/**").addResourceLocations("/WEB-INF/resources/js/");
        registry.addResourceHandler("/app/**").addResourceLocations("/WEB-INF/resources/app/");
        registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/resources/images/");
        registry.addResourceHandler("/font/**").addResourceLocations("/WEB-INF/resources/font/");
        registry.addResourceHandler("/fonts/**").addResourceLocations("/WEB-INF/resources/fonts/");
        registry.addResourceHandler("/views/**").addResourceLocations("/WEB-INF/views/");
        registry.addResourceHandler("/assets/**").addResourceLocations("/WEB-INF/resources/assets/");
        registry.addResourceHandler("/fotos/**").addResourceLocations("file:/home/jonathan/Desktop/genomas/");  // system files
    }

//    @Bean
//    public PropertyPlaceholderConfigurer getPropertyPlaceholderConfigurer() throws MalformedURLException {
//        PropertyPlaceholderConfigurer ppc = new PropertyPlaceholderConfigurer();
//        ppc.setLocation(new ClassPathResource("properties/application.properties"));
//        final String USER_HOME = System.getProperty("user.home");
//        final String propertiesFile = USER_HOME + File.separator + "bdp-webappmonitoring" + File.separator + "app-monitoring.properties";
//        ppc.setLocation(new FileSystemResource(propertiesFile));
//        ppc.setIgnoreUnresolvablePlaceholders(true);
//        return ppc;
//    }
    @Bean
    public PropertyPlaceholderConfigurer getPropertyPlaceholderConfigurer() {
        PropertyPlaceholderConfigurer ppc = new PropertyPlaceholderConfigurer();
        ppc.setLocation(new ClassPathResource("application.properties"));
        ppc.setIgnoreUnresolvablePlaceholders(true);
        return ppc;
    }

    @Bean
    public WebContentInterceptor webContentInterceptor() {
        WebContentInterceptor interceptor = new WebContentInterceptor();
        interceptor.setCacheSeconds(0);
        interceptor.setUseExpiresHeader(true);
        interceptor.setUseCacheControlHeader(true);
        interceptor.setUseCacheControlNoStore(true);

        return interceptor;
    }

    @Bean
    public LocaleResolver localeResolver() {
        //LocaleResolverDinamico usando cookies
        //CookieLocaleResolver resolver = new CookieLocaleResolver();
        SessionLocaleResolver resolver = new SessionLocaleResolver();
        resolver.setDefaultLocale(new Locale("es"));
//        resolver.setCookieName("myLocaleCookie");
//        resolver.setCookieMaxAge(4800);
        return resolver;
    }

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:languajes/messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor interceptor = new LocaleChangeInterceptor();
        interceptor.setParamName("locale");
        registry.addInterceptor(interceptor);
        registry.addInterceptor(webContentInterceptor());
    }


    /*Converters to rest services*/
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter());
        converters.add(new StringHttpMessageConverter());
        super.configureMessageConverters(converters);
    }

    /* THYMELEAF CONFIG */
    @Bean
    public ViewResolver thymeleafViewResolver(SpringTemplateEngine ste) {
        ThymeleafViewResolver tvr = new ThymeleafViewResolver();
        tvr.setTemplateEngine(getTemplateEngine(getTemplateResolver()));
        return tvr;
    }

    @Bean
    public SpringTemplateEngine getTemplateEngine(TemplateResolver tr) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(tr);
        return templateEngine;
    }

    @Bean
    public TemplateResolver getTemplateResolver() {

        TemplateResolver tr = new SpringResourceTemplateResolver();
        tr.setPrefix("/WEB-INF/templates/");
        tr.setSuffix(".html");
        tr.setTemplateMode("HTML5");
        return tr;
    }

}
