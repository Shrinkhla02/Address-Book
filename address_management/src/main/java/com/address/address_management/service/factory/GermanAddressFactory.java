package com.address.address_management.service.factory;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.dto.AddressValidationResponseDTO;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;
import com.address.address_management.model.dto.country.GermanyAddressDTO;
import com.address.address_management.model.dto.ValidationError;
import com.address.address_management.model.entity.Address;
import com.address.address_management.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class GermanAddressFactory implements AddressHandler {
    
    @Autowired
    private AddressRepository addressRepository;
    
    @Override
    public AddressValidationResponseDTO validate(AddressRequestDTO address) {
        List<ValidationError> errors = new ArrayList<>();
        
        if (!isValidGermanPostalCode(address.getZipcode())) {
            errors.add(ValidationError.builder()
                    .field("zipcode")
                    .code("INVALID_POSTAL_CODE")
                    .message("Invalid German postal code format. Expected format: 5 digits")
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
                    .message("Bundesland is required for German addresses")
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
                .city(addressRequest.getCity())
                .zipcode(addressRequest.getZipcode())
                .countryCode(addressRequest.getCountryCode())
                .build();
        
        address = addressRepository.save(address);
        return mapToCountrySpecificDTO(address);
    }
    
    private boolean isValidGermanPostalCode(String postalCode) {
        return postalCode != null && postalCode.matches("^[0-9]{5}$");
    }
    
    public CountrySpecificAddressDTO mapToCountrySpecificDTO(Address address) {
        return GermanyAddressDTO.builder()
                .name(address.getName())
                .addLine1(address.getAddLine1())
                .addLine2(address.getAddLine2())
                .plz(address.getZipcode())
                .city(address.getCity())
                .bundesLand(address.getRegion())
                .country(address.getCountryCode().toString())
                .build();
    }
}