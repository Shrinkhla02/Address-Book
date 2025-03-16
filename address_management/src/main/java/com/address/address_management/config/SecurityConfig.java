package com.address.address_management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // Enables CORS support using the global CORS configuration bean
            .and()
            .csrf().disable()  // Disable CSRF if not needed for your API
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // Adjust authorization rules as needed
            );
        return http.build();
    }
}