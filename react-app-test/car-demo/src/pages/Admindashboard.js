import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Admindashboard() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="lib_dashGreeting_right mt-20 text-center text-3xl font-bold">
              Welcome Administrator
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard;