package com.address.address_management.model.dto;

import com.address.address_management.model.enums.CountryCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    
    private Long id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Address line 1 is required")
    private String addLine1;
    
    private String addLine2;
    
    private String addLine3;
    
    @NotBlank(message = "Region is required")
    private String region;

    @NotBlank(message = "City is required")
    private String city;
    
    @NotBlank(message = "Zipcode is required")
    private String zipcode;
    
    @NotNull(message = "Country code is required")
    private CountryCode countryCode;
}