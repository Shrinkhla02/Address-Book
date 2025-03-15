package com.address.address_management.model.dto;

import com.address.address_management.model.enums.CountryCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    private String name;

    @NotBlank(message = "Address line 1 is required")
    @Size(max = 255, message = "Address line 1 cannot exceed 255 characters")
    private String addLine1;

    @Size(max = 255, message = "Address line 2 cannot exceed 255 characters")
    private String addLine2;

    @Size(max = 255, message = "Address line 3 cannot exceed 255 characters")
    private String addLine3;

    @NotBlank(message = "Region is required")
    @Size(max = 255, message = "Region cannot exceed 255 characters")
    private String region;

    @NotBlank(message = "Zipcode is required")
    @Size(max = 20, message = "Zipcode cannot exceed 20 characters")
    private String zipcode;

    @NotNull(message = "City is required")
    @Size(max = 20, message = "City cannot exceed 20 characters")
    private String city;

    @NotNull(message = "Country code is required")
    private CountryCode countryCode;
}