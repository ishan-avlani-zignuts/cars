import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white" style={{ width: '250px' }}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <Link
            to="#"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Admin dashboard</span>
          </Link>
          <Link to="/adminaddcar" className="list-group-item list-group-item-action py-2 ripple active">
            <i className="fas fa-chart-area fa-fw me-3"></i><span>Add Cars</span>
          </Link>
          <Link to="/admincarmanage" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-lock fa-fw me-3"></i><span>View and Manage cars</span>
          </Link>
          <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-chart-line fa-fw me-3"></i><span>View and Manage bookings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;