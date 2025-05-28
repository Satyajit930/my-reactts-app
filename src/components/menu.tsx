import React from 'react';
import { Link } from 'react-router-dom';

const Menucomponent: React.FC = () => {
  return (
    <div>
        <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/Add-Form" className="btn btn-primary">Add Form</Link>
            <Link to="/" className="btn btn-success">List View</Link>
        </div>
    </div>
  );
};

export default Menucomponent;
