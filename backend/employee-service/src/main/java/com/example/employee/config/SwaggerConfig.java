package com.example.employee.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Freelance Platform - Employee Service API")
                        .version("1.0.0")
                        .description("REST API for managing freelancers and their skills in the freelance platform")
                        .contact(new Contact()
                                .name("Freelance Platform Team")
                                .email("support@freelanceplatform.com")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server"),
                        new Server().url("http://localhost:8081").description("Local Development Server (Profile)")
                ));
    }
}