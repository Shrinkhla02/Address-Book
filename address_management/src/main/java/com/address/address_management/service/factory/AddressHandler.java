package com.address.address_management.service.factory;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.entity.Address;
import com.address.address_management.model.dto.AddressValidationResponseDTO;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;

public interface AddressHandler {
    AddressValidationResponseDTO validate(AddressRequestDTO address);
    CountrySpecificAddressDTO save(AddressRequestDTO address);
    CountrySpecificAddressDTO mapToCountrySpecificDTO(Address address);
}