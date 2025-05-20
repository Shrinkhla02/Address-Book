# Address Management System: Architecture Overview

## System Purpose
The Address Management System is designed to handle address data across multiple countries, with country-specific validation, formatting, and storage capabilities. The system provides RESTful APIs for creating, searching, and retrieving address information.

## Architecture Overview

### Design Patterns Used
1. **Factory Pattern**: The system uses a factory pattern (`AddressServiceFactory`) to create appropriate handlers for different country-specific address implementations.
2. **Strategy Pattern**: Different address handling strategies are implemented for each supported country.
3. **Repository Pattern**: Data access is abstracted through repository interfaces.
4. **DTO Pattern**: Data Transfer Objects are used to separate the API contract from internal entities.
5. **Specification Pattern**: Used for creating flexible search criteria.

### Key Components

#### Controller Layer
- `AddressController`: Exposes REST endpoints for address operations
  - GET `/addresses`: Retrieves all addresses with pagination
  - GET `/addresses/search`: Searches addresses based on various criteria
  - POST `/addresses`: Creates a new address

#### Service Layer
- `AddressService`: Orchestrates business logic for address operations
- `AddressServiceFactory`: Creates country-specific handler implementations based on country code
- Country-specific Address Handlers:
  - `USAddressFactory`
  - `UKAddressFactory`
  - `CanadianAddressFactory`
  - `GermanAddressFactory`
  - `IndianAddressFactory`

#### Repository Layer
- `AddressRepository`: JPA repository for address data operations
- `AddressSpecification`: Creates specifications for flexible address searching

#### Model Layer
- **Entities**:
  - `Address`: Main entity representing an address
- **DTOs**:
  - Base DTOs:
    - `AddressDTO`: Basic address information
    - `AddressRequestDTO`: Information required to create an address
    - `AddressResponseDTO`: Generic address response information
  - Country-specific DTOs:
    - `CountrySpecificAddressDTO`: Interface for all country-specific DTOs
    - `USAAddressDTO`, `UKAddressDTO`, `CanadaAddressDTO`, `GermanyAddressDTO`, `IndiaAddressDTO`
- **Enums**:
  - `CountryCode`: Enumeration of supported countries (USA, GBR, CAN, DEU, IND)

#### Error Handling
- `ValidationException`: Thrown when address validation fails
- Country-specific validation logic in each address handler

## Key Workflows

### 1. Creating an Address
1. Client sends address data to the API
2. System validates the address based on country-specific rules
3. If validation passes, the address is saved
4. The address is returned in a country-specific format

### 2. Searching Addresses
1. Client provides search criteria
2. System builds a dynamic query using the Specification pattern
3. Addresses matching the criteria are retrieved
4. Each address is converted to its country-specific format before returning

### 3. Retrieving All Addresses
1. Client requests all addresses with pagination parameters
2. System retrieves the requested page of addresses
3. Each address is converted to its country-specific format before returning

## Technologies Used
- **Spring Boot**: Core framework
- **Spring Data JPA**: For data access
- **Hibernate**: ORM for database operations
- **Lombok**: For reducing boilerplate code
- **Swagger/OpenAPI**: For API documentation

## Extensibility
The system is designed to be extensible:
- New country support can be added by:
  1. Adding a new country code to the `CountryCode` enum
  2. Creating a country-specific DTO implementing `CountrySpecificAddressDTO`
  3. Implementing a country-specific handler that implements `AddressHandler`
  4. Updating the `AddressServiceFactory` to return the new handler for the new country code
