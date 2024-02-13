import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Admincarmanage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admincarmanage");
        const data = response.data;
        setCars(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:5001/api/admindeletecar/${carId}`);
      
      setCars(cars.filter(car => car._id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="container">
      <h1>Car List</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Fuel Type</th>
            <th>Rate</th>
            <th>Actions</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}>
              <td>{car.name}</td>
              <td>{car.company}</td>
              <td>{car.type}</td>
              <td>{car.capacity}</td>
              <td>{car.fueltype}</td>
              <td>{car.rate}</td>
              <td>
                <Link to={`/adminupdatecar/${car._id}`} className="btn btn-primary mr-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
              <td>
              <img src={`data:image/jpeg;base64,${car.image}`} alt={car.name} className="img-fluid" style={{ maxWidth: '100px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/adminaddcar" className="btn btn-success">Add Car</Link>
    </div>
  );
};

export default Admincarmanage;
