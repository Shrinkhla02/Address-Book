package com.address.address_management.model.dto.country;

import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * Germany-specific address DTO
 */
@Data
@SuperBuilder

public class GermanyAddressDTO implements CountrySpecificAddressDTO {
    private String name;
    private String addLine1;
    private String addLine2;
    private String city;
    private String country;
    private String bundesLand; // German state (e.g., Bayern, Berlin)
    private String plz; // German postal code (5 digits)
}