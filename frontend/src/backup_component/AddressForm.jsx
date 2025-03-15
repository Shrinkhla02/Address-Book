// src/components/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '../constants/countries';
import { validateForm, validateField } from '../utils/validation';
import { api } from '../services/api';
import CountrySelector from './CountrySelector';

const AddressForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when country changes
  useEffect(() => {
    setFormData({
      name: formData.name, // Keep the name
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      zipcode: '',
    });
    setErrors({});
    setSubmitSuccess(false);
  }, [selectedCountry]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    if (selectedCountry) {
      const { error } = validateField(name, value, selectedCountry);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateForm(formData, selectedCountry);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add country to the form data
      const addressData = {
        ...formData,
        country: selectedCountry,
      };
      
      // Validate address with API
      const validationResult = await api.validateAddress(addressData);
      
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        setIsSubmitting(false);
        return;
      }
      
      // Submit address to API
      await api.createAddress(addressData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: '',
        zipcode: '',
      });
      setSelectedCountry('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting address:', error);
      setErrors({ submit: 'Failed to submit address. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const { name, label, type, required, options } = field;
    
    if (type === 'select' && options) {
      return (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block font-medium mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <select
            id={name}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors[name] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
      );
    }
    
    return (
      <div key={name} className="mb-4">
        <label htmlFor={name} className="block font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
            errors[name] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          required={required}
        />
        {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Address submitted successfully!
        </div>
      )}
      
      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <CountrySelector selectedCountry={selectedCountry} onChange={handleCountryChange} />
        
        {selectedCountry && COUNTRIES[selectedCountry] && (
          <>
            {COUNTRIES[selectedCountry].fields.map((field) => renderField(field))}
          </>
        )}
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
          disabled={isSubmitting || !selectedCountry}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Address'}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;