// src/constants/countries.js
export const COUNTRIES = {
    USA: {
      name: "United States",
      fields: [
        { name: "addressLine1", label: "Street Address", type: "text", required: true },
        { name: "addressLine2", label: "Apt, Suite, Unit, etc.", type: "text", required: false },
        { name: "city", label: "City", type: "text", required: true },
        { name: "state", label: "State", type: "select", required: true, options: [
          { value: "AL", label: "Alabama" },
          { value: "AK", label: "Alaska" },
          // Add all US states here
          { value: "WY", label: "Wyoming" }
        ]},
        { name: "zipcode", label: "ZIP Code", type: "text", required: true, pattern: "\\d{5}(-\\d{4})?" }
      ],
      validation: {
        zipcode: /^\d{5}(-\d{4})?$/
      }
    },
    India: {
      name: "India",
      fields: [
        { name: "addressLine1", label: "Flat/House No., Floor, Building", type: "text", required: true },
        { name: "addressLine2", label: "Colony/Street/Locality", type: "text", required: true },
        { name: "landmark", label: "Landmark", type: "text", required: false },
        { name: "city", label: "City", type: "text", required: true },
        { name: "state", label: "State", type: "select", required: true, options: [
          { value: "Andhra Pradesh", label: "Andhra Pradesh" },
          { value: "Maharashtra", label: "Maharashtra" },
          // Add all Indian states here
          { value: "West Bengal", label: "West Bengal" }
        ]},
        { name: "zipcode", label: "PIN Code", type: "text", required: true, pattern: "\\d{6}" }
      ],
      validation: {
        zipcode: /^\d{6}$/
      }
    },
    // Add more countries with their specific formats
    UK: {
      name: "United Kingdom",
      fields: [
        { name: "addressLine1", label: "House number/name and street", type: "text", required: true },
        { name: "addressLine2", label: "Address line 2", type: "text", required: false },
        { name: "city", label: "Town/City", type: "text", required: true },
        { name: "state", label: "County", type: "text", required: false },
        { name: "zipcode", label: "Postcode", type: "text", required: true, pattern: "[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}" }
      ],
      validation: {
        zipcode: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
      }
    },
    // Germany configuration
Germany: {
    name: "Germany",
    fields: [
      { name: "addressLine1", label: "Street and House Number", type: "text", required: true },
      { name: "addressLine2", label: "Additional Address Info", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "State (Bundesland)", type: "select", required: true, options: [
        { value: "Baden-Württemberg", label: "Baden-Württemberg" },
        { value: "Bayern", label: "Bayern" },
        { value: "Berlin", label: "Berlin" },
        { value: "Brandenburg", label: "Brandenburg" },
        { value: "Bremen", label: "Bremen" },
        { value: "Hamburg", label: "Hamburg" },
        { value: "Hessen", label: "Hessen" },
        { value: "Mecklenburg-Vorpommern", label: "Mecklenburg-Vorpommern" },
        { value: "Niedersachsen", label: "Niedersachsen" },
        { value: "Nordrhein-Westfalen", label: "Nordrhein-Westfalen" },
        { value: "Rheinland-Pfalz", label: "Rheinland-Pfalz" },
        { value: "Saarland", label: "Saarland" },
        { value: "Sachsen", label: "Sachsen" },
        { value: "Sachsen-Anhalt", label: "Sachsen-Anhalt" },
        { value: "Schleswig-Holstein", label: "Schleswig-Holstein" },
        { value: "Thüringen", label: "Thüringen" }
      ]},
      { name: "zipcode", label: "Postal Code (PLZ)", type: "text", required: true, pattern: "\\d{5}" }
    ],
    validation: {
      zipcode: /^\d{5}$/,
      // In German addresses, the street name typically comes first, followed by the house number
      addressLine1: (value) => {
        // Basic validation to ensure there's text followed by a number (e.g., "Hauptstrasse 123")
        const hasStreetAndNumber = /^[A-Za-zÄäÖöÜüß\s\.-]+ \d+[A-Za-z]?$/.test(value);
        return hasStreetAndNumber ? { isValid: true } : { 
          isValid: false, 
          error: "Please enter street name followed by house number (e.g., Hauptstrasse 123)" 
        };
      }
    }
  },
  
  // Canada configuration
  Canada: {
    name: "Canada",
    fields: [
      { name: "addressLine1", label: "Street Address", type: "text", required: true },
      { name: "addressLine2", label: "Apt, Suite, Unit, etc.", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "Province/Territory", type: "select", required: true, options: [
        { value: "AB", label: "Alberta" },
        { value: "BC", label: "British Columbia" },
        { value: "MB", label: "Manitoba" },
        { value: "NB", label: "New Brunswick" },
        { value: "NL", label: "Newfoundland and Labrador" },
        { value: "NS", label: "Nova Scotia" },
        { value: "NT", label: "Northwest Territories" },
        { value: "NU", label: "Nunavut" },
        { value: "ON", label: "Ontario" },
        { value: "PE", label: "Prince Edward Island" },
        { value: "QC", label: "Quebec" },
        { value: "SK", label: "Saskatchewan" },
        { value: "YT", label: "Yukon" }
      ]},
      { name: "zipcode", label: "Postal Code", type: "text", required: true, pattern: "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d" }
    ],
    validation: {
      // Canadian postal codes follow the format A1A 1A1 (letter-number-letter space/optional number-letter-number)
      zipcode: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/i
    }
},
};
  