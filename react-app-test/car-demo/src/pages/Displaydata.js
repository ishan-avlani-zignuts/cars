//display data page is for admin where all the car list is displayed in form of table so that admin can manage all the operations eaasily

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarData } from '../redux/actions/carActions';
import { useNavigate } from 'react-router-dom'; 

const Displaydata = () => {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars);
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(fetchCarData());
  }, [dispatch]);

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`); 
  };

  return (
    <div className="container">
      <h1>Car List</h1>
      <div className="grid grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car._id} className="border p-4" onClick={() => handleCarClick(car._id)}>
            <img src={`/assets/images/${car.image}`} alt={car.name} className="w-full mb-2" />
            <h2 className="text-xl font-semibold">{car.name}</h2>
            <p>Company: {car.company}</p>
            <p>Type: {car.type}</p>
            <p>Capacity: {car.capacity}</p>
            <p>Fuel Type: {car.fueltype}</p>
            <p>Rate: {car.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Displaydata;

