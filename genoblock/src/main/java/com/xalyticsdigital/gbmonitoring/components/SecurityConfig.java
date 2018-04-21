package com.xalyticsdigital.gbmonitoring.components;

//import com.xalyticsdigital.gbconnected.filters.CsrfHeaderFilter;
//import com.xalyticsdigital.gbconnected.services.AuthenticationEntryPoint;
import javax.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.servlet.mvc.WebContentInterceptor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//    @Autowired
//    @Qualifier("usuarioDetailsService")
//    UserDetailsService userDetailsService;

//    @Autowired
//    AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        //auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        auth.inMemoryAuthentication().withUser("a").password("a").roles("ADMIN");
        auth.inMemoryAuthentication().withUser("analista").password("gbconnected2017").roles("DASHBOARD_USER");
    } 

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        
        http.authorizeRequests()
                .antMatchers("/public/**", "/login/**").permitAll()
                .antMatchers("/private/**").fullyAuthenticated()
                .and().formLogin().loginPage("/login")
                .defaultSuccessUrl("/login", true).failureUrl("/login?error")
                .usernameParameter("username").passwordParameter("password")
                .and().logout().logoutSuccessUrl("/login?logout")
                .and().exceptionHandling().accessDeniedPage("/accesodenegado");
                //.and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                //.and().csrf().csrfTokenRepository(csrfTokenRepository()).and()
                //.addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder;
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");        
        return repository;
    }
    
//    private Filter csrfHeaderFilter() {
//        return new CsrfHeaderFilter();
//    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/apirest/**",  //protegida ya que solo sera accesible desde una autenticacion de la app
                "/stream/**",
                "/socket/**",
                "/app-websocket/**",
                "/bdp-webapp-websocket/**");
    }
}
