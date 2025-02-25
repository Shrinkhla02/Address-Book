package com.example.addressservice.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public enum CountryCode {
    USA("United States"),
    CAN("Canada"),
    MEX("Mexico"),
    FRA("France"),
    DEU("Germany");
    // Add more countries as needed

    private final String countryName;
}
