package trypilci.back.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, GoogleTokenFilter googleTokenFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of(frontendUrl)); // allow this origin
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // all methods
                    config.setAllowedHeaders(List.of("*")); // allow all headers
                    config.setAllowCredentials(true); // allow cookies
                    return config;
                }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/health/**", "/h2-console/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(googleTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
