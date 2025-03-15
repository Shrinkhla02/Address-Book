package com.address.address_management.service.factory;

import com.address.address_management.model.enums.CountryCode;
import org.springframework.stereotype.Component;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class AddressServiceFactory {
    
    private static ApplicationContext applicationContext;
    
    @Autowired
    public void setApplicationContext(ApplicationContext applicationContext) {
        AddressServiceFactory.applicationContext = applicationContext;
    }
    
    public static AddressHandler getHandler(CountryCode countryCode) {
        return switch (countryCode) {
            case USA -> applicationContext.getBean(USAddressFactory.class);
            case GBR -> applicationContext.getBean(UKAddressFactory.class);
            case CAN -> applicationContext.getBean(CanadianAddressFactory.class);
            case DEU -> applicationContext.getBean(GermanAddressFactory.class);
            case IND -> applicationContext.getBean(IndianAddressFactory.class);
            default -> throw new IllegalArgumentException("Unsupported country code: " + countryCode);
        };
    }
}