import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        {/* Start Navbar Links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
              <i className="bi bi-list"></i>
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Home</a>
          </li>
        </ul>
        
        {/* End Navbar Links */}
        
      </div>
    </nav>
  );
};

export default Header;