package com.address.address_management.model.dto.country;

import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * India-specific address DTO
 */
@Data
@SuperBuilder
public class IndiaAddressDTO implements CountrySpecificAddressDTO {
    private String name;
    private String addLine1;
    private String addLine2;
    private String landmark;
    private String country;
    private String city;
    private String state;// Indian state (e.g., Maharashtra, Tamil Nadu)
    private String pinCode; // Indian postal code (6 digits)
}