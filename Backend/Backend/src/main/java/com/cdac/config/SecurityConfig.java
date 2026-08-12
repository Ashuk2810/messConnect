package com.cdac.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.cdac.filter.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "http://localhost:5175"
                )
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

                // Public APIs
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login",
                    "/api/users/forgot-password",
                    "/api/users/verify-otp",
                    "/api/users/reset-password"
                ).permitAll()

                // Food list - Admin and Billing Staff
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/admin/food/all"
                ).hasAnyAuthority(
                    "ADMIN",
                    "BILLING_STAFF"
                )

                // Users list - Admin and Billing Staff
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/users/all"
                ).hasAnyAuthority(
                    "ADMIN",
                    "BILLING_STAFF"
                )

                // Today's Menu - User and Billing Staff
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/user/menu"
                ).hasAnyAuthority(
                    "USER",
                    "BILLING_STAFF"
                )

                // All other Admin APIs
                .requestMatchers("/api/admin/**")
                .hasAuthority("ADMIN")

                // Admin wallet recharge
                .requestMatchers("/api/wallet/recharge")
                .hasAuthority("ADMIN")

                // Wallet balance
                .requestMatchers("/api/wallet/balance/**")
                .hasAnyAuthority(
                    "USER",
                    "ADMIN",
                    "BILLING_STAFF"
                )

                // Billing APIs
                .requestMatchers("/api/billing/**")
                .hasAnyAuthority(
                    "ADMIN",
                    "BILLING_STAFF"
                )

                // Other User APIs
                .requestMatchers("/api/user/**")
                .hasAuthority("USER")

                // User feedback
                .requestMatchers(
                    "/api/feedback/submit",
                    "/api/feedback/my"
                ).hasAuthority("USER")

                // Admin feedback
                .requestMatchers(
                    "/api/feedback/all",
                    "/api/feedback/food/**"
                ).hasAuthority("ADMIN")

                // Refund request - Billing Staff
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/refund/request"
                ).hasAuthority("BILLING_STAFF")

                // Pending refunds - Admin
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/refund/pending"
                ).hasAuthority("ADMIN")

                // Refund update - Admin
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/refund/**"
                ).hasAuthority("ADMIN")

                // User refund history
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/refund/my-history"
                ).hasAuthority("USER")

                // Everything else
                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}