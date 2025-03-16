// src/services/api.js
const API_BASE_URL = 'http://localhost:8081';

export const api = {
  // Get all addresses with pagination
  getAddresses: async (page = 0, size = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  },
  
  // Search for addresses with filters
  searchAddresses: async (params) => {
    try {
      // Extract search parameters
      const { 
        addressLine = '', 
        name = '',
        region = '',
        code = '',
        city= '',
        countryCodes = [], 
        page = 0, 
        size = 10 
      } = params;
      
      // Build query string
      let queryParams = new URLSearchParams();
      
      if (addressLine) queryParams.append('addressLine', addressLine);
      if (name) queryParams.append('name', name);
      if (region) queryParams.append('region', region);
      if (code) queryParams.append('code', code);
      if (city) queryParams.append('city', city);
      
      // Add country codes if present
      if (countryCodes && countryCodes.length > 0) {
        countryCodes.forEach(code => {
          queryParams.append('countryCodes', code);
        });
      }
      
      queryParams.append('page', page);
      queryParams.append('size', size);
      
      const url = `${API_BASE_URL}/addresses/search?${queryParams.toString()}`;
      console.log("url: ", url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      
      console.log("response: ", response);
      
      if (!response.ok) {
        throw new Error('Failed to search addresses');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching addresses:', error);
      throw error;
    }
  },
  
  // Create a new address
  createAddress: async (addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
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
  
  // Validate an address
  validateAddress: async (addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
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