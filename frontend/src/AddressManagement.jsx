import React from "react";

const AddressManagement = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Address Management</h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button className="flex-1 py-3 text-gray-500 border-b-2 border-gray-300">
            New Address
          </button>
          <button className="flex-1 py-3 text-black font-semibold border-b-2 border-black">
            Search Addresses
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search addresses..."
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <select className="p-3 border rounded-md">
            <option>Any country</option>
          </select>
          <button className="p-3 border rounded-md bg-gray-200 hover:bg-gray-300">
            🔍
          </button>
        </div>

        {/* No Addresses Found Message */}
        <div className="p-8 text-gray-500 border rounded-md text-center text-lg">
          No addresses found
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;