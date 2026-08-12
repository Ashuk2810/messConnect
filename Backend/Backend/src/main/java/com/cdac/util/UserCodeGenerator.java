package com.cdac.util;

import com.cdac.enums.UserType;


public class UserCodeGenerator {
	public static String getPrefix(UserType userType ) {
		
		return switch(userType) {
		case FACULTY ->"FAC";
		case HOSTELLER ->"HOS";
		case DAY_SCHOLAR -> "DAY";
		case STAFF -> "STF";
		
		
		
		};
	}

}
