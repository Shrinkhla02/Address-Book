package com.example.addressservice.controllers;

import com.example.addressservice.enums.CountryCode;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
@Tag(name = "Products", description = "Operations related to products")
public class AddressController {

    @GetMapping("/{countryCode}/search")
    public void getAddress(@PathVariable CountryCode countryCode){

    }

}
