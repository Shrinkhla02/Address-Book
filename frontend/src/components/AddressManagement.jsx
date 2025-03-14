import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddressSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    zipCode: '',
    countries: []
  });

  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const resultsPerPage = 10;

  // Mock data for demonstration
  const mockAddresses = [
    { id: 1, name: 'John Doe', address1: '123 Main St', address2: 'Apt 4B', address3: 'Downtown', state: 'California', zipCode: '90210', country: 'USA' },
    { id: 2, name: 'Jane Smith', address1: '456 Elm St', address2: '', address3: 'Westside', state: 'New York', zipCode: '10001', country: 'USA' },
    { id: 3, name: 'Raj Patel', address1: '789 Banyan Ave', address2: 'Floor 3', address3: 'Andheri', state: 'Maharashtra', zipCode: '400053', country: 'India' },
    { id: 4, name: 'Hans Mueller', address1: '101 Berliner Str', address2: '', address3: '', state: 'Berlin', zipCode: '10115', country: 'Germany' },
    { id: 5, name: 'Emma Watson', address1: '24 Oxford St', address2: 'Flat 12', address3: '', state: 'London', zipCode: 'W1D 1AP', country: 'UK' },
    { id: 6, name: 'Michael Chen', address1: '50 Yonge St', address2: 'Suite 200', address3: '', state: 'Ontario', zipCode: 'M5E 1J1', country: 'Canada' },
    { id: 7, name: 'Sarah Johnson', address1: '842 Pine Rd', address2: '', address3: '', state: 'Texas', zipCode: '75001', country: 'USA' },
    { id: 8, name: 'Amit Kumar', address1: '23 Gandhi Road', address2: 'Building C', address3: 'Sector 4', state: 'Delhi', zipCode: '110001', country: 'India' },
    { id: 9, name: 'Sophie Müller', address1: '67 Münchener Platz', address2: '', address3: '', state: 'Bavaria', zipCode: '80331', country: 'Germany' },
    { id: 10, name: 'David Williams', address1: '18 Liverpool St', address2: 'Unit 3', address3: '', state: 'Manchester', zipCode: 'M1 3NL', country: 'UK' },
    { id: 11, name: 'Lucas Tremblay', address1: '42 Maple Ave', address2: 'Suite 500', address3: '', state: 'Quebec', zipCode: 'H2X 2B5', country: 'Canada' },
    { id: 12, name: 'Jessica Parker', address1: '321 Oak Ln', address2: '', address3: 'East End', state: 'Illinois', zipCode: '60007', country: 'USA' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    setSearchParams(prev => ({
      ...prev,
      countries: checked 
        ? [...prev.countries, value] 
        : prev.countries.filter(country => country !== value)
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Filter mock addresses based on search criteria
    let results = [...mockAddresses];
    
    if (searchParams.name) {
      results = results.filter(addr => 
        addr.name.toLowerCase().includes(searchParams.name.toLowerCase())
      );
    }
    
    if (searchParams.address1) {
      results = results.filter(addr => 
        addr.address1.toLowerCase().includes(searchParams.address1.toLowerCase())
      );
    }
    
    if (searchParams.state) {
      results = results.filter(addr => 
        addr.state.toLowerCase().includes(searchParams.state.toLowerCase())
      );
    }
    
    if (searchParams.zipCode) {
      results = results.filter(addr => 
        addr.zipCode.includes(searchParams.zipCode)
      );
    }
    
    if (searchParams.countries.length > 0) {
      results = results.filter(addr => 
        searchParams.countries.includes(addr.country)
      );
    }
    
    setSearchResults(results);
    setShowResults(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchParams({
      name: '',
      address1: '',
      address2: '',
      address3: '',
      state: '',
      zipCode: '',
      countries: []
    });
    setSearchResults([]);
    setShowResults(false);
  };

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const closeModal = () => {
    setSelectedAddress(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    className="form-control"
                    id="name"
                    name="name"
                    value={searchParams.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    value={searchParams.address1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={searchParams.address2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="address3" className="form-label">Address Line 3</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address3"
                    name="address3"
                    value={searchParams.address3}
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
                    id="state"
                    name="state"
                    value={searchParams.state}
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
                    value={searchParams.zipCode}
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
                        name="countries"
                        value={country}
                        checked={searchParams.countries.includes(country)}
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
              <button type="button" className="btn btn-outline-secondary me-2" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="btn btn-dark">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {showResults && (
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Search Results</h3>
            <span className="badge bg-light text-dark">{searchResults.length} {searchResults.length === 1 ? 'address' : 'addresses'} found</span>
          </div>
          <div className="card-body p-0">
            {searchResults.length > 0 ? (
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
                      {currentResults.map(address => (
                        <tr 
                          key={address.id} 
                          onClick={() => handleAddressClick(address)}
                          style={{ cursor: 'pointer' }}
                          className="address-row"
                        >
                          <td>{address.name}</td>
                          <td>{address.address1}</td>
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
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        
                        {[...Array(totalPages).keys()].map(number => (
                          <li 
                            key={number + 1} 
                            className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(number + 1)}
                            >
                              {number + 1}
                            </button>
                          </li>
                        ))}
                        
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
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
                  <dd className="col-sm-9">{selectedAddress.address1}</dd>
                  
                  {selectedAddress.address2 && (
                    <>
                      <dt className="col-sm-3">Address 2</dt>
                      <dd className="col-sm-9">{selectedAddress.address2}</dd>
                    </>
                  )}
                  
                  {selectedAddress.address3 && (
                    <>
                      <dt className="col-sm-3">Address 3</dt>
                      <dd className="col-sm-9">{selectedAddress.address3}</dd>
                    </>
                  )}
                  
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