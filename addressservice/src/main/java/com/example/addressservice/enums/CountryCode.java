package com.example.addressservice.enums;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum CountryCode {
    USA("United States"),
    CAN("Canada"),
    MEX("Mexico"),
    FRA("France"),
    DEU("Germany");
    // Add more countries as needed

    private final String countryName;
    CountryCode(String countryName) {
        this.countryName = countryName;
    }
}
