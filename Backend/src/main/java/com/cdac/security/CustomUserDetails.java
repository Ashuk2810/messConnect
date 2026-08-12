package com.cdac.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cdac.entity.User;
import com.cdac.enums.UserStatus;

public class CustomUserDetails  implements UserDetails{
	private User user;
	public CustomUserDetails(User user) {
		this.user =user;
		
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		
		return Collections.singletonList(
				new SimpleGrantedAuthority(user.getRole().name()));
				
	}
	@Override
	public String getPassword() {
		return user.getPassword();
	}
	
	@Override
	public String getUsername() {
		return user.getUserCode();
	}
	@Override
	public boolean isAccountNonExpired() {
		return user.getStatus() ==UserStatus.ACTIVE;
		
	}
	@Override 
	public boolean isCredentialsNonExpired() {
		return true;
		
	}
	@Override
	public boolean isEnabled() {
		return user.getStatus() ==UserStatus.ACTIVE;
	}
 }
