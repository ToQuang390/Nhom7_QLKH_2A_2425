//package com.example.app.stock_management.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//
//@Configuration
//public class CrosConfig  {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**") // hoặc "/**"
//                        .allowedOriginPatterns("http://localhost:3000") // frontend
//                        .allowedMethods("*")
//                        .allowedHeaders("*")
//                        .allowCredentials(false);
//            }
//        };
//    }
//
//}
