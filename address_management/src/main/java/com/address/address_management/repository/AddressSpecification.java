package com.address.address_management.repository;

import com.address.address_management.model.entity.Address;
import com.address.address_management.model.enums.CountryCode;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class AddressSpecification {

    public static Specification<Address> searchAddresses(
            String name,
            String addressLine,
            List<CountryCode> countryCodes,
            String city,
            String region,
            String code) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Exact match for name
            if (name != null && !name.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("name"), name));
            }

            // Partial match for address lines
            if (addressLine != null && !addressLine.trim().isEmpty()) {
                Predicate addLine1Like = criteriaBuilder.like(criteriaBuilder.lower(root.get("addLine1")), "%" + addressLine.toLowerCase() + "%");
                Predicate addLine2Like = criteriaBuilder.like(criteriaBuilder.lower(root.get("addLine2")), "%" + addressLine.toLowerCase() + "%");
                Predicate addLine3Like = criteriaBuilder.like(criteriaBuilder.lower(root.get("addLine3")), "%" + addressLine.toLowerCase() + "%");
                predicates.add(criteriaBuilder.or(addLine1Like, addLine2Like, addLine3Like));
            }

            // Multiple country codes (exact match)
            if (countryCodes != null && !countryCodes.isEmpty()) {
                predicates.add(root.get("countryCode").in(countryCodes));
            }

            // Partial match for region
            if (region != null && !region.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("region")), "%" + region.toLowerCase() + "%"));
            }

            // Partial match for region
            if (city != null && !city.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("city")), "%" + city.toLowerCase() + "%"));
            }

            // Partial match for zipcode
            if (code != null && !code.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("zipcode")), "%" + code.toLowerCase() + "%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}