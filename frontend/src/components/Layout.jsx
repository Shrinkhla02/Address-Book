import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Address Manager</a>
        </div>
      </nav>
      
      <main className="container py-4">
        {children}
      </main>
      
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center">
          <p className="mb-0">© 2025 Address Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;