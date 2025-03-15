package com.address.address_management.model.enums;

/**
 * Enumeration of supported country codes
 */
public enum CountryCode {
    USA("United States"),
    GBR("United Kingdom"),
    CAN("Canada"),
    DEU("Germany"),
    IND("India");
    
    private final String countryName;
    
    CountryCode(String countryName) {
        this.countryName = countryName;
    }
    
    public String getCountryName() {
        return countryName;
    }
    
    public static boolean isValidCountryCode(String code) {
        if (code == null || code.length() != 3) {
            return false;
        }
        
        try {
            CountryCode.valueOf(code);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}