import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Adminaddcar() {
  const [credentials, setCredentials] = useState({ name: "", company: "", type: "", capacity: "", fueltype: "", rate: "", image: "" });
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', credentials.name);
    formData.append('company', credentials.company);
    formData.append('type', credentials.type);
    formData.append('capacity', credentials.capacity);
    formData.append('fueltype', credentials.fueltype);
    formData.append('rate', credentials.rate);
    formData.append('image', credentials.image);

    try {
      const response = await axios.post("http://localhost:5001/api/adminaddcar", formData);
    //  console.log(response.data);
      if (response.data.success) {
        alert("Data added successfully");
        navigate("/admindashboard");
      } else {
        alert("Invalid inputs");
      }
    } catch (error) {
      //console.error("Error adding car:", error);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  const handleFileChange = (event) => {
    setCredentials({ ...credentials, image: event.target.files[0] });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Add Cars Page</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <input
                type="text"
                onChange={onChange}
                placeholder="Name"
                value={credentials.name}
                name="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                onChange={onChange}
                placeholder="Company"
                value={credentials.company}
                name="company"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                onChange={onChange}
                placeholder="Type"
                value={credentials.type}
                name="type"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                onChange={onChange}
                placeholder="Capacity"
                value={credentials.capacity}
                name="capacity"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                onChange={onChange}
                placeholder="Fuel Type"
                value={credentials.fueltype}
                name="fueltype"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                onChange={onChange}
                placeholder="Rate"
                value={credentials.rate}
                name="rate"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                onChange={handleFileChange}
                name="image"
                accept="image/*"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="submit"
                value="Add Car"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
      <Link to="/signup"></Link>
    </div>
  )
}

export default Adminaddcar;
