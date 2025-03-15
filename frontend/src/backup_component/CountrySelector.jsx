// src/components/CountrySelector.jsx
import React from 'react';
import { COUNTRIES } from '../constants/countries';

const CountrySelector = ({ selectedCountry, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="country" className="block font-medium mb-1">Country</label>
      <select
        id="country"
        name="country"
        value={selectedCountry || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select a country</option>
        {Object.entries(COUNTRIES).map(([code, country]) => (
          <option key={code} value={code}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;