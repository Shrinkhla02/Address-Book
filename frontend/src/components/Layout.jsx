// src/components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Global Address Management System</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          {children}
        </div>
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Global Address Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;