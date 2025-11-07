package trypilci.back.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, GoogleTokenFilter googleTokenFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/google/callback", "/h2-console/**").permitAll()
                        .anyRequest().authenticated()
                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(jwt -> {})  // Spring auto-configures JwtDecoder via issuer-uri
//                )
                .addFilterBefore(googleTokenFilter, UsernamePasswordAuthenticationFilter.class);

//        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        return http.build();
    }
}
