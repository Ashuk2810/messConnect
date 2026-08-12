package com.cdac.util;


import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.expiration}")
	private long jwtExpiration;
	
	//converting secret string into secret key
	private SecretKey getSigningKey() {
		
		
		
	    return Keys.hmacShaKeyFor(secretKey.getBytes());
	}

	
	//generate jwt token
	public String generateToken(String userCode) {
		return Jwts.builder()
				.subject(userCode)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() +jwtExpiration))
				.signWith(getSigningKey())
				.compact();
		
	}
	// extract user code from token generated
	public  String extractUserCode(String token) {
		return extractAllClaims(token).getSubject();
		
		
	}
	// check token entry 
	public boolean isTokenExpired(String token) {
		return extractAllClaims(token)
				.getExpiration()
				.before(new Date());
		
	}
	
	//validate token
	public boolean validateToken(String token, String userCode) {
		String extractUserCode = extractUserCode(token);
		
		return extractUserCode.equals(userCode) && !isTokenExpired(token);
		
	}
	
	// read claims
	private Claims extractAllClaims(String token) {
		return Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
}
}
