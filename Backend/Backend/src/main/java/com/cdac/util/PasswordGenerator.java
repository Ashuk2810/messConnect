package com.cdac.util;

public class PasswordGenerator {
	
	public static String generatePassword(String fullName, String userCode) {
		String firstFour= fullName.replaceAll("\\s", "").toUpperCase();
		
		
		
		if(firstFour.length() >=4) {
			firstFour =firstFour.substring(0,4);
			
		}
		String lastFour = userCode.substring(userCode.length()-4);
		
		return firstFour + lastFour;
	}

}
