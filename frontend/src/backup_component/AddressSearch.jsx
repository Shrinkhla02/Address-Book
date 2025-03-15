// src/components/AddressSearch.jsx
// import React, { useState } from 'react';
// import { COUNTRIES } from '../constants/countries';
// import { api } from '../services/api';
// import CountrySelector from './CountrySelector';
// import AddressDisplay from './AddressDisplay';

// const AddressSearch = () => {
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [error, setError] = useState('');
//   const [searchAcrossCountries, setSearchAcrossCountries] = useState(false);

//   const handleCountryChange = (country) => {
//     setSelectedCountry(country);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!searchTerm.trim()) {
//       setError('Please enter a search term');
//       return;
//     }
    
//     setIsSearching(true);
//     setError('');
    
//     try {
//       // If searchAcrossCountries is true, pass null as country to search across all countries
//       const country = searchAcrossCountries ? null : selectedCountry;
//       const results = await api.searchAddresses(searchTerm, country);
      
//       setSearchResults(results);
      
//       if (results.length === 0) {
//         setError('No addresses found matching your search criteria');
//       }
//     } catch (error) {
//       console.error('Error searching addresses:', error);
//       setError('Failed to search addresses. Please try again.');
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Search Addresses</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="mb-4">
//           <label htmlFor="searchTerm" className="block font-medium mb-1">
//             Search Term
//           </label>
//           <input
//             type="text"
//             id="searchTerm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Name, street, city, etc."
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               checked={searchAcrossCountries}
//               onChange={(e) => setSearchAcrossCountries(e.target.checked)}
//               className="mr-2"
//             />
//             Search across all countries
//           </label>
//         </div>
        
//         {!searchAcrossCountries && (
//           <CountrySelector selectedCountry={selectedCountry} onChange={handleCountryChange} />
//         )}
        
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
//           disabled={isSearching || (!searchAcrossCountries && !selectedCountry)}
//         >
//           {isSearching ? 'Searching...' : 'Search'}
//         </button>
//       </form>
      
//       {searchResults.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Search Results</h3>
//           <div className="space-y-4">
//             {searchResults.map((address) => (
//               <AddressDisplay key={address._id} address={address} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressSearch;

import React, { useState } from 'react';
import { COUNTRIES } from '../constants/countries';
import { api } from '../services/api';
import CountrySelector from './CountrySelector';
import AddressDisplay from './AddressDisplay';

const AddressSearch = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('single'); // 'single' or 'multi'

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    if (searchType === 'single' && !selectedCountry) {
      setError('Please select a country for single country search');
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    try {
      // If searchType is 'multi', pass null as country to search across all countries
      const country = searchType === 'multi' ? null : selectedCountry;
      const results = await api.searchAddresses(searchTerm, country);
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No addresses found matching your search criteria');
      }
    } catch (error) {
      console.error('Error searching addresses:', error);
      setError('Failed to search addresses. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Search Addresses</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block font-medium mb-1">Search Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="single"
              checked={searchType === 'single'}
              onChange={() => setSearchType('single')}
              className="mr-2"
            />
            Single Country Search
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="multi"
              checked={searchType === 'multi'}
              onChange={() => setSearchType('multi')}
              className="mr-2"
            />
            Multi-Country Search
          </label>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="mb-4">
          <label htmlFor="searchTerm" className="block font-medium mb-1">
            Search Term
          </label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name, street, city, etc."
            required
          />
        </div>
        
        {searchType === 'single' && (
          <CountrySelector selectedCountry={selectedCountry} onChange={handleCountryChange} />
        )}
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
          disabled={isSearching || (searchType === 'single' && !selectedCountry)}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Search Results ({searchResults.length})</h3>
          <div className="space-y-4">
            {searchResults.map((address, index) => (
              <AddressDisplay key={index} address={address} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;