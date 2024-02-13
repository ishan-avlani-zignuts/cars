import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminupdatecar = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    name: '',
    company: '',
    type: '',
    capacity: '',
    fueltype: '',
    rate: '',
    image: '',
  });
  const { id } = useParams();


  useEffect(() => {
    const fetchCar = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5001/api/displaydata/${id}`);
        const data = response.data;
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/adminupdatecar/${id}`, car);
      navigate('/admincarmanage');
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      [name]: value,
    }));
  };

  if (!car.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={car.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company</label>
          <input type="text" className="form-control" id="company" name="company" value={car.company} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input type="text" className="form-control" id="type" name="type" value={car.type} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">Capacity</label>
          <input type="text" className="form-control" id="capacity" name="capacity" value={car.capacity} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="fueltype" className="form-label">Fuel Type</label>
          <input type="text" className="form-control" id="fueltype" name="fueltype" value={car.fueltype} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">Rate</label>
          <input type="text" className="form-control" id="rate" name="rate" value={car.rate} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default Adminupdatecar;
