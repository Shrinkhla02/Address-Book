package com.address.address_management.model.dto.country;

import lombok.Data;
import lombok.experimental.SuperBuilder;


/**
 * UK-specific address DTO
 */
@Data
@SuperBuilder
public class UKAddressDTO implements CountrySpecificAddressDTO {
    private String name;
    private String addLine1;
    private String addLine2;
    private String postCode;
    private String city;
    private String county;
    private String country; // UK format (e.g., SW1A 1AA)
}