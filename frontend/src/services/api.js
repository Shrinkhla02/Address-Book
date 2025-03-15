// src/services/api.js
const API_BASE_URL = 'http://localhost:8081';

export const api = {
  // Create a new address
  createAddress: async (addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create address');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  },
  
  // Search for addresses
  searchAddresses: async (query, country = null) => {
    try {
      let url = `${API_BASE_URL}/addresses/search?q=${encodeURIComponent(query)}`;
      
      if (country) {
        url += `&country=${encodeURIComponent(country)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to search addresses');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching addresses:', error);
      throw error;
    }
  },
  
  // Validate an address
  validateAddress: async (addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to validate address');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error validating address:', error);
      throw error;
    }
  }
};
