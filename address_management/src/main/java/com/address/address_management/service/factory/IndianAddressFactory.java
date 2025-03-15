package com.address.address_management.service.factory;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.dto.AddressValidationResponseDTO;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;
import com.address.address_management.model.dto.country.IndiaAddressDTO;
import com.address.address_management.model.dto.ValidationError;
import java.util.ArrayList;
import java.util.List;
import com.address.address_management.model.entity.Address;
import com.address.address_management.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IndianAddressFactory implements AddressHandler {
    
    private final AddressRepository addressRepository;

    @Autowired
    public IndianAddressFactory(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }
    
    @Override
    public AddressValidationResponseDTO validate(AddressRequestDTO address) {
        List<ValidationError> errors = new ArrayList<>();
        
        if (!isValidIndianPincode(address.getZipcode())) {
            errors.add(ValidationError.builder()
                    .field("zipcode")
                    .code("INVALID_PINCODE")
                    .message("Invalid Indian PIN code format. Expected format: 6 digits")
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
                    .message("State/Region is required for Indian addresses")
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
    
    private boolean isValidIndianPincode(String pincode) {
        return pincode != null && pincode.matches("^[1-9][0-9]{5}$");
    }
    
    public CountrySpecificAddressDTO mapToCountrySpecificDTO(Address address) {
        return IndiaAddressDTO.builder()
                .name(address.getName())
                .addLine1(address.getAddLine1())
                .addLine2(address.getAddLine2())
                .landmark(address.getAddLine3())
                .state(address.getRegion())
                .city(address.getCity())
                .pinCode(address.getZipcode())
                .country(String.valueOf(address.getCountryCode()))
                .build();
    }
}