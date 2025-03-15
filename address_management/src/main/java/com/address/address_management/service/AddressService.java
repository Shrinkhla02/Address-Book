package com.address.address_management.service;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.dto.AddressValidationResponseDTO;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;
import com.address.address_management.model.entity.Address;
import com.address.address_management.model.enums.CountryCode;
import com.address.address_management.repository.AddressRepository;
import com.address.address_management.repository.AddressSpecification;
import com.address.address_management.service.factory.AddressServiceFactory;
import com.address.address_management.exception.ValidationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Page<CountrySpecificAddressDTO> getAllAddresses(Pageable pageable) {
        Page<Address> addresses = addressRepository.findAll(pageable);
        return addresses.map(address -> {
            var addressHandler = AddressServiceFactory.getHandler(address.getCountryCode());
            return addressHandler.mapToCountrySpecificDTO(address);
        });
    }

    public Page<CountrySpecificAddressDTO> searchAddresses(
            String name,
            String addressLine,
            List<CountryCode> countryCodes,
            String region,
            String city,
            String code,
            Pageable pageable) {

        Specification<Address> spec = AddressSpecification.searchAddresses(
                name, addressLine, countryCodes, city, region, code);

        Page<Address> addresses = addressRepository.findAll(spec, pageable);
        return addresses.map(address -> {
            var addressHandler = AddressServiceFactory.getHandler(address.getCountryCode());
            return addressHandler.mapToCountrySpecificDTO(address);
        });
    }

    public CountrySpecificAddressDTO saveAddress(@Valid AddressRequestDTO addressRequest) {
        var addressHandler = AddressServiceFactory.getHandler(addressRequest.getCountryCode());

        // Perform country-specific validation
        AddressValidationResponseDTO validationResult = addressHandler.validate(addressRequest);

        if (!validationResult.isValid()) {
            throw new ValidationException("Address validation failed", validationResult.getErrors());
        }

        // Delegate saving to the country-specific handler and return country-specific format
        return addressHandler.save(addressRequest);
    }
}
