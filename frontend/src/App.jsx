// src/App.jsx
import React, { useState } from 'react';
import Layout from './components/Layout';
import AddressForm from './components/AddressForm';
import AddressSearch from './components/AddressSearch';

const App = () => {
  const [activeTab, setActiveTab] = useState('add');
  
  return (
    <Layout>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'add'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('add')}
            >
              Add Address
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('search')}
            >
              Search Addresses
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'add' ? <AddressForm /> : <AddressSearch />}
    </Layout>
  );
};

export default App; 
