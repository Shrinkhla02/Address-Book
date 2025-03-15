import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../services/api'; // Adjust path as needed


const AddressSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    addressLine: '',
    address2: '',
    address3: '',
    region: '',
    code: '',
    countryCodes: []
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  // Add validation state
  const [nameError, setNameError] = useState('');
  console.log("serachResults: ", searchResults)
  
  const resultsPerPage = 10;

  // // Load initial addresses on component mount
  // useEffect(() => {
  //   const fetchInitialAddresses = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.getAddresses(0, resultsPerPage);
  //       setSearchResults(response.content || []);
  //       setTotalPages(response.totalPages || 1);
  //       setShowResults(true);
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Failed to load addresses. Please try again. blah blah');
  //       setLoading(false);
  //     }
  //   };

  //   fetchInitialAddresses();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Add name validation
    if (name === 'name') {
      // Check if the value contains only alphabets and spaces
      if (value && !/^[A-Za-z\s]+$/.test(value)) {
        setNameError('Name should contain only alphabets and spaces');
      } else {
        setNameError('');
      }
    }
    
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    setSearchParams(prev => ({
      ...prev,
      countryCodes: checked 
        ? [...prev.countryCodes, value] 
        : prev.countryCodes.filter(country => country !== value)
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validate before search
    if (nameError) {
      return; // Don't proceed with search if there's a validation error
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Map address1 to addressLine for API call
      const params = {
        name: searchParams.name,
        addressLine: searchParams.addressLine,
        region: searchParams.region,
        code: searchParams.code,
        countryCodes: searchParams.countryCodes.length > 0 ? searchParams.countryCodes : undefined,
        page: 0,
        size: resultsPerPage
      };
      
      const response = await api.searchAddresses(params);
      console.log("Params1: ", params)
      console.log(response.data.content);
      
      setSearchResults(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(0);
      setShowResults(true);
      setLoading(false);
    } catch (err) {
      setError('Error searching addresses. Please try again.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      name: '',
      addressLine: '',
      address2: '',
      address3: '',
      region: '',
      zipCode: '',
      countryCodes: []
    });
    setNameError('');
  };
  
  // const loadInitialAddresses = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await api.getAddresses(0, resultsPerPage);
  //     setSearchResults(response.content || []);
  //     setTotalPages(response.totalPages || 1);
  //     setCurrentPage(0);
  //     setShowResults(true);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Failed to load addresses. Please try again.');
  //     setLoading(false);
  //   }
  // };

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const closeModal = () => {
    setSelectedAddress(null);
  };

  // Pagination handler
  const handlePageChange = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (isSearchActive()) {
        // If search filters are active, use search endpoint
        const params = {
          name: searchParams.name,
          addressLine: searchParams.addressLine,
          region: searchParams.region,
          code: searchParams.code,
          countryCodes: searchParams.countryCodes.length > 0 ? searchParams.countryCodes : undefined,
          page: pageNumber,
          size: resultsPerPage
        };
        
        response = await api.searchAddresses(params);
        console.log("Params: ", params)
      } else {
        // Otherwise, get all addresses with pagination
        response = await api.getAddresses(pageNumber, resultsPerPage);
      }
      
      setSearchResults(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(pageNumber);
      setLoading(false);
    } catch (err) {
      setError('Error loading page. Please try again.');
      setLoading(false);
    }
  };
  
  // Check if any search filters are active
  const isSearchActive = () => {
    return (
      searchParams.name ||
      searchParams.addressLine ||
      searchParams.state ||
      searchParams.code ||
      searchParams.countryCodes.length > 0
    );
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Address Management</h1>
      
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Search Addresses</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${nameError ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={searchParams.name}
                    onChange={handleInputChange}
                    placeholder="Enter alphabetic characters only"
                  />
                  {nameError && (
                    <div className="invalid-feedback">
                      {nameError}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="addressLine" className="form-label">Address Line</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine"
                    name="addressLine"
                    value={searchParams.addressLine}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="region"
                    name="region"
                    value={searchParams.region}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={searchParams.code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label">Countries</label>
              <div className="row">
                {['India', 'Germany', 'UK', 'USA', 'Canada'].map(country => (
                  <div className="col-md-4 mb-2" key={country}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`country-${country}`}
                        name="countryCodes"
                        value={country}
                        checked={searchParams.countryCodes.includes(country)}
                        onChange={handleCountryChange}
                      />
                      <label className="form-check-label" htmlFor={`country-${country}`}>
                        {country}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="d-flex justify-content-end">
              <button 
                type="button" 
                className="btn btn-outline-secondary me-2" 
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </button>
              <button 
                type="submit" 
                className="btn btn-dark"
                disabled={nameError || loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
          <button 
            type="button" 
            className="btn-close float-end" 
            onClick={() => setError(null)}
          ></button>
        </div>
      )}
      
      {showResults && (
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Search Results</h3>
            <span className="badge bg-light text-dark">
              {searchResults.length} {searchResults.length === 1 ? 'address' : 'addresses'} found
            </span>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="d-flex justify-content-center p-5">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map(address => (
                        <tr 
                          key={address.id} 
                          onClick={() => handleAddressClick(address)}
                          style={{ cursor: 'pointer' }}
                          className="address-row"
                        >
                          <td>{address.name}</td>
                          {/* <td>{address.addressLine || address.address1}</td> */}
                          <td>{address.addLine1}</td>
                          <td>{address.state}</td>
                          <td>{address.country}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                 {totalPages > 1 && (
                  <div className="d-flex justify-content-center p-3">
                    <nav>
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0 || loading}
                          >
                            Previous
                          </button>
                        </li>
                        
                        {(() => {
                          const pagesToShow = [];
                          const maxPagesToShow = 10;
                          
                          // Always show first page
                          pagesToShow.push(0);
                          
                          if (totalPages <= maxPagesToShow) {
                            // If we have 10 or fewer pages, show all of them
                            for (let i = 1; i < totalPages; i++) {
                              pagesToShow.push(i);
                            }
                          } else {
                            // Handle cases with more than 10 pages
                            const siblingsCount = 2; // Number of siblings to show on each side of current page
                            
                            // Show pages around current page
                            const startPage = Math.max(1, currentPage - siblingsCount);
                            const endPage = Math.min(totalPages - 2, currentPage + siblingsCount);
                            
                            // Add ellipsis after first page if needed
                            if (startPage > 1) {
                              pagesToShow.push('start-ellipsis');
                            }
                            
                            // Add pages around current page
                            for (let i = startPage; i <= endPage; i++) {
                              pagesToShow.push(i);
                            }
                            
                            // Add ellipsis before last page if needed
                            if (endPage < totalPages - 2) {
                              pagesToShow.push('end-ellipsis');
                            }
                            
                            // Always show last page
                            pagesToShow.push(totalPages - 1);
                          }
                          
                          // Remove duplicates (can happen in edge cases)
                          return [...new Set(pagesToShow)].map(page => {
                            if (page === 'start-ellipsis' || page === 'end-ellipsis') {
                              return (
                                <li key={page} className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              );
                            }
                            
                            return (
                              <li 
                                key={`page-${page}`} 
                                className={`page-item ${currentPage === page ? 'active' : ''}`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(page)}
                                  disabled={loading}
                                >
                                  {page + 1}
                                </button>
                              </li>
                            );
                          });
                        })()}
                        
                        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1 || loading}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="p-5 text-center text-muted">
                <p className="mb-0">No addresses found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Modal for address details */}
      {selectedAddress && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Address Details</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <dl className="row mb-0">
                  <dt className="col-sm-3">Name</dt>
                  <dd className="col-sm-9">{selectedAddress.name}</dd>
                  
                  <dt className="col-sm-3">Address 1</dt>
                  <dd className="col-sm-9">{selectedAddress.addLine1}</dd>
                  
                  {(selectedAddress.addLine2) && (
                    <>
                      <dt className="col-sm-3">Address 2</dt>
                      <dd className="col-sm-9">{selectedAddress.addLine2}</dd>
                    </>
                  )}
                  
                  {(selectedAddress.addLine3) && (
                    <>
                      <dt className="col-sm-3">Address 3</dt>
                      <dd className="col-sm-9">{selectedAddress.addLine3}</dd>
                    </>
                  )}

                  {/* <dt className="col-sm-3">City</dt>
                  <dd className="col-sm-9">{selectedAddress.state}</dd> */}
                  
                  <dt className="col-sm-3">State</dt>
                  <dd className="col-sm-9">{selectedAddress.state}</dd>
                  
                  <dt className="col-sm-3">Zip Code</dt>
                  <dd className="col-sm-9">{selectedAddress.zipCode}</dd>
                  
                  <dt className="col-sm-3">Country</dt>
                  <dd className="col-sm-9">{selectedAddress.country}</dd>
                </dl>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom CSS for hover effect */}
      <style jsx>{`
        .address-row:hover {
          background-color: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default AddressSearch;