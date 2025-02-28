package com.example.addressservice.controllers;

import com.example.addressservice.enums.CountryCode;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@Tag(name = "Products", description = "Operations related to products")
public class AddressController {

    @GetMapping("/{countryCode}/search")
    public void getAddressByCountrySearch(@PathVariable CountryCode countryCode){

    }

    @GetMapping("/search")
    public void getAddressBySearch(
            @RequestParam(name = "Name", required = false) String name,
            @RequestParam(name = "Addline1", required = false) String addLine1
    ){

    }

    @GetMapping("/{id}")
    public void getAddressById(@PathVariable String id){

    }

}
