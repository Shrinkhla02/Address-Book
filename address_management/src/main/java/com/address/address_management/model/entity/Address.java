package com.address.address_management.model.entity;

import com.address.address_management.model.enums.CountryCode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing an address in the system
 */
@Entity
@Table(name = "address")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "add_line1", nullable = false)
    private String addLine1;
    
    @Column(name = "add_line2")
    private String addLine2;
    
    @Column(name = "add_line3")
    private String addLine3;
    
    @Column(name = "region", nullable = false)
    private String region;
    
    @Column(name = "zipcode", nullable = false)
    private String zipcode;

    @Column(name = "city", nullable = false)
    private String city;
    
    @Column(name = "country_code", nullable = false, length = 3)
    @Enumerated(EnumType.STRING)
    private CountryCode countryCode;
}