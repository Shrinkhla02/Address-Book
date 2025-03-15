package com.address.address_management.service.factory;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.dto.AddressValidationResponseDTO;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;
import com.address.address_management.model.dto.country.UKAddressDTO;
import com.address.address_management.model.dto.ValidationError;
import com.address.address_management.model.entity.Address;
import com.address.address_management.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class UKAddressFactory implements AddressHandler {
    
    @Autowired
    private AddressRepository addressRepository;
    
    @Override
    public AddressValidationResponseDTO validate(AddressRequestDTO address) {
        List<ValidationError> errors = new ArrayList<>();
        
        if (!isValidUKPostcode(address.getZipcode())) {
            errors.add(ValidationError.builder()
                    .field("zipcode")
                    .code("INVALID_POSTCODE")
                    .message("Invalid UK postcode format. Expected format: e.g., SW1A 1AA or M1 1AA")
                    .build());
        }
        
        if (address.getAddLine1() == null || address.getAddLine1().trim().isEmpty()) {
            errors.add(ValidationError.builder()
                    .field("addLine1")
                    .code("REQUIRED_FIELD")
                    .message("Address line 1 is required")
                    .build());
        }
        
        if (address.getRegion() == null || address.getRegion().trim().isEmpty()) {
            errors.add(ValidationError.builder()
                    .field("region")
                    .code("REQUIRED_FIELD")
                    .message("County is required for UK addresses")
                    .build());
        }
        
        return AddressValidationResponseDTO.builder()
                .valid(errors.isEmpty())
                .message(errors.isEmpty() ? "Address validation successful" : "Validation failed")
                .errors(errors)
                .build();
    }
    
    @Override
    public CountrySpecificAddressDTO save(AddressRequestDTO addressRequest) {
        Address address = Address.builder()
                .name(addressRequest.getName())
                .addLine1(addressRequest.getAddLine1())
                .addLine2(addressRequest.getAddLine2())
                .addLine3(addressRequest.getAddLine3())
                .region(addressRequest.getRegion())
                .zipcode(addressRequest.getZipcode())
                .city(addressRequest.getCity())
                .countryCode(addressRequest.getCountryCode())
                .build();
        
        address = addressRepository.save(address);
        return mapToCountrySpecificDTO(address);
    }
    
    private boolean isValidUKPostcode(String postcode) {
        if (postcode == null) return false;
        // UK postcode regex pattern
        // Format: AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
        return postcode.matches("^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$");
    }
    
    public CountrySpecificAddressDTO mapToCountrySpecificDTO(Address address) {
        return UKAddressDTO.builder()
                .name(address.getName())
                .addLine1(address.getAddLine1())
                .addLine2(address.getAddLine2())
                .postCode(address.getZipcode())
                .county(address.getRegion())
                .city(address.getCity())
                .country(address.getCountryCode().toString())
                .build();
    }
}