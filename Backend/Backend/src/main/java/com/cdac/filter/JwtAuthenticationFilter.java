package com.cdac.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cdac.security.CustomUserDetailsService;
import com.cdac.util.JwtUtil;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CustomUserDetailsService customUserDetailService;
	
	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request,
			@NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain)
			throws ServletException, IOException{
		String authHeader = request.getHeader("Authorization");
		
		
		System.out.println("Request URI : " + request.getRequestURI());
		System.out.println("Authorization Header : " + authHeader);
		
		if (authHeader ==null || !authHeader.startsWith("Bearer ")) {
			
			filterChain.doFilter(request, response);
			return;
		}
		
		String token =authHeader.substring(7);
		String userCode=jwtUtil.extractUserCode(token);
		
		if (userCode != null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
			
			UserDetails userDetails =
					customUserDetailService.loadUserByUsername(userCode);
			if (jwtUtil.validateToken(token, userDetails.getUsername())) {

			    System.out.println("JWT VALID = true");
			    System.out.println("AUTHORITIES = " + userDetails.getAuthorities());

			    UsernamePasswordAuthenticationToken authentication =
			            new UsernamePasswordAuthenticationToken(
			                    userDetails,
			                    null,
			                    userDetails.getAuthorities());

			    authentication.setDetails(
			            new WebAuthenticationDetailsSource()
			                    .buildDetails(request));

			    SecurityContextHolder
			            .getContext()
			            .setAuthentication(authentication);
			}
			
		}
		  filterChain.doFilter(request, response);
	}

}
