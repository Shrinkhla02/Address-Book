package com.address.address_management.model.dto.country;

import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Canada-specific address DTO
 */
//@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CanadaAddressDTO implements CountrySpecificAddressDTO {
    private String name;
    private String addLine1;
    private String addLine2;
    private String country;
    private String city;
    private String province; // Canadian province (e.g., Ontario, Quebec)
    private String postalCode; // Canadian format (e.g., A1A 1A1)
}

