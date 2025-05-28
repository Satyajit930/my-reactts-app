import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
      {/* Sidebar Brand */}
      <div className="sidebar-brand">
        <a href="/" className="brand-link">
          {/* <img
            src="/dist/assets/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image opacity-75 shadow"
          /> */}
          <span className="brand-text fw-light">React</span>
        </a>
      </div>

      {/* Sidebar Wrapper */}
      <div className="sidebar-wrapper">
        <nav className="mt-2">
          <ul
            className="nav sidebar-menu flex-column"
            data-lte-toggle="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="/Add-Form" className="nav-link">
                <i className="nav-icon bi bi-circle text-warning"></i>
                <p>Add User</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon bi bi-circle text-info"></i>
                <p>List User</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;