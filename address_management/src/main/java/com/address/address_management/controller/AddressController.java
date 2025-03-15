package com.address.address_management.controller;

import com.address.address_management.model.dto.AddressRequestDTO;
import com.address.address_management.model.dto.ApiResponse;
import com.address.address_management.model.dto.country.CountrySpecificAddressDTO;
import com.address.address_management.model.enums.CountryCode;
import com.address.address_management.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/addresses", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Address Management", description = "APIs for managing addresses")
public class AddressController {
    @Autowired
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @Operation(summary = "Get all addresses", description = "Returns a paginated list of all addresses")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved addresses",
                content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ApiResponse.class))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<ApiResponse<Page<CountrySpecificAddressDTO>>> getAllAddresses(
            @Parameter(description = "Page number (zero-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Size of page") @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CountrySpecificAddressDTO> addresses = addressService.getAllAddresses(pageable);
        return ResponseEntity.ok(ApiResponse.success(addresses, "Addresses retrieved successfully"));
    }
    
    @Operation(summary = "Search addresses", description = "Search addresses based on various criteria")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully searched addresses",
                content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = ApiResponse.class))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<CountrySpecificAddressDTO>>> searchAddresses(
            @Parameter(description = "Name to search for") @RequestParam(required = false) String name,
            @Parameter(description = "Address line to search for") @RequestParam(required = false) String addressLine,
            @Parameter(description = "Country codes to filter by") @RequestParam(required = false) List<CountryCode> countryCodes,
            @Parameter(description = "Region to filter by") @RequestParam(required = false) String region,
            @Parameter(description = "Code to search for") @RequestParam(required = false) String code,
            @Parameter(description = "Page number (zero-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Size of page") @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CountrySpecificAddressDTO> addresses = addressService.searchAddresses(
                name, addressLine, countryCodes, region, code, pageable);
        return ResponseEntity.ok(ApiResponse.success(addresses, "Addresses searched successfully"));
    }

    @Operation(summary = "Create a new address", description = "Creates a new address based on the provided data")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Address successfully created",
                content = @Content(mediaType = "application/json", 
                schema = @Schema(implementation = CountrySpecificAddressDTO.class))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input data"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<CountrySpecificAddressDTO> createAddress(
            @Parameter(description = "Address data", required = true) 
            @Valid @RequestBody AddressRequestDTO addressRequest) {
        CountrySpecificAddressDTO savedAddress = addressService.saveAddress(addressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
    }
}
