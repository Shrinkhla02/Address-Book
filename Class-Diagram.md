
# DTO Relationships in the Address Management System

## ![Class Diagram](https://github.com/user-attachments/assets/13aa5d1f-b9e9-483d-a97f-78c5dd635a7e)


### 1. Updated Code Structure with DTO Connections
This diagram shows how `AddressDTO`, `AddressRequestDTO`, and `AddressResponseDTO` connect with other components in the system. The arrows indicate data flow and relationships between these DTOs and system components.

### 2. DTO Flow Diagram
Provides a clearer view of how the different DTOs are used in the request/response cycle, showing the transformation from client requests to database entities and back to responses.

### 3. DTO Class Hierarchy
This class diagram focuses specifically on the DTO classes and their relationships. It shows the inheritance structure between `AddressResponseDTO` and `CountrySpecificAddressDTO`, as well as the implementations for different countries.

---

## Key Observations about the DTOs

- **AddressDTO**  
  A basic data structure for address information. It appears to be used for internal data handling.

- **AddressRequestDTO**  
  Used when a client sends a request to create a new address. The controller receives this in the `POST` endpoint.

- **AddressResponseDTO**  
  Acts as a parent class for response DTOs. Based on the source code, it defines the basic structure that country-specific DTOs inherit from.

- **CountrySpecificAddressDTO**  
  An interface implemented by each country-specific DTO class. The country-specific factories create these to represent addresses in country-specific formats.
