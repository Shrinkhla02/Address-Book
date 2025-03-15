package com.address.address_management.model.dto.country;
import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * USA-specific address DTO
 */
@Data
@SuperBuilder
public class USAAddressDTO implements CountrySpecificAddressDTO {
    private String name;
    private String addLine1;
    private String addLine2;
    private String zipCode;
    private String state;
    private String city;
    private String country;
}