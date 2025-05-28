import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AdminLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  breadcrumb?: string[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  pageTitle = "General Form", 
  breadcrumb = ["Home", "General Form"] 
}) => {
  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary">
      <div className="app-wrapper">
        {/* Header */}
        <Header />
        
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="app-main">
          {/* Content Header */}
          <div className="app-content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="mb-0">{pageTitle}</h3>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-end">
                    {breadcrumb.map((item, index) => (
                      <li 
                        key={index}
                        className={`breadcrumb-item ${index === breadcrumb.length - 1 ? 'active' : ''}`}
                        {...(index === breadcrumb.length - 1 ? { 'aria-current': 'page' } : {})}
                      >
                        {index === breadcrumb.length - 1 ? item : <a href="#">{item}</a>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="app-content">
            <div className="container-fluid">
              <div className="row g-4">
                <div className="col-12">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;