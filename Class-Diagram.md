
# DTO Relationships in the Address Management System

### 1. Code Structure with DTO Connections
![Code Structure Diagram with TDO Connections](https://github.com/user-attachments/assets/cffe4de3-4fa0-42de-ae7c-c3f2882c6af3)

This diagram shows how `AddressDTO`, `AddressRequestDTO`, and `AddressResponseDTO` connect with other components in the system. The arrows indicate data flow and relationships between these DTOs and system components.

### 2. DTO Flow Diagram
![DTO Flow Diagram](https://github.com/user-attachments/assets/29e2d422-62bd-4c89-8db3-e3b3c70ed32e)
Provides a clearer view of how the different DTOs are used in the request/response cycle, showing the transformation from client requests to database entities and back to responses.

### 3. DTO Class Hierarchy
![DTO Class Hirarchy](https://github.com/user-attachments/assets/3ea3c6b0-395f-4b56-b3a2-cf0920138946)
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
