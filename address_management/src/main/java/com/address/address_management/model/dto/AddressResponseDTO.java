package com.address.address_management.model.dto;

import com.address.address_management.model.enums.CountryCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponseDTO {
    private Long id;
    private String name;
    private String addLine1;
    private String addLine2;
    private String addLine3;
    private String region;
    private String city;
    private String zipcode;
    private CountryCode countryCode;
}