package com.address.address_management.service.factory;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.dto.AddressValidationResponseDTO;
import com.address.address_management.model.dto.country.CanadaAddressDTO;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;
import com.address.address_management.model.dto.ValidationError;
import com.address.address_management.model.entity.Address;
import com.address.address_management.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class CanadianAddressFactory implements AddressHandler {
    
    @Autowired
    private AddressRepository addressRepository;
    
    @Override
    public AddressValidationResponseDTO validate(AddressRequestDTO address) {
        List<ValidationError> errors = new ArrayList<>();
        
        if (!isValidCanadianPostalCode(address.getZipcode())) {
            errors.add(ValidationError.builder()
                    .field("zipcode")
                    .code("INVALID_POSTAL_CODE")
                    .message("Invalid Canadian postal code format. Expected format: A1A 1A1")
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
                    .message("Province is required for Canadian addresses")
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
    
    private boolean isValidCanadianPostalCode(String postalCode) {
        return postalCode != null && postalCode.matches("^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z] ?\\d[ABCEGHJ-NPRSTV-Z]\\d$");
    }
    
    @Override
    public CountrySpecificAddressDTO mapToCountrySpecificDTO(Address address) {
        return CanadaAddressDTO.builder()
                .name(address.getName())
                .addLine1(address.getAddLine1())
                .addLine2(address.getAddLine2())
                .postalCode(address.getZipcode())
                .city(address.getCity())
                .province(address.getRegion())
                .country(address.getCountryCode().toString())
                .build();
    }
}