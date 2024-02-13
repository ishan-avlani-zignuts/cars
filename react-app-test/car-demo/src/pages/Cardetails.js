
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

function Cardetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    city: "",
    state: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/displaydata/${id}`
        );
        setCar(response.data);
      } catch (error) {
       // console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  const handleStartTimeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      startTime: value,
    });
  };

  const handleEndTimeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      endTime: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/bookcar", {
        carId: id,
        ...formData,
      });
      const data = response.data;
      if (data.success) {
        const userConfirmed = window.confirm(
          "Are you sure you want to confirm the booking?"
        );
        if (userConfirmed) {
          alert("data added successfully");
          navigate(`/confirmation`);
        }
      }
    } catch (error) {
     // console.error("Error booking the car:", error);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`data:image/jpeg;base64,${car.image}`}
                    alt={car.name}
                    className="img-fluid mb-2"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
                <div className="col-md-6 text-justify">
                  <div style={{ fontSize: "36px" }}>Car Details</div>

                  <table>
                    <tr>
                      <td>
                        <strong>Name:</strong>
                      </td>
                      <td>{car.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Company:</strong>
                      </td>
                      <td>{car.company}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Type:</strong>
                      </td>
                      <td>{car.type}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Capacity:</strong>
                      </td>
                      <td>{car.capacity}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Fuel Type:</strong>
                      </td>
                      <td>{car.fueltype}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Rates per km:</strong>
                      </td>
                      <td>{car.rate}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: "36px" }}>Book Now</div>
              <form onSubmit={handleSubmit} className="text-start">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3 row text-center">
                  <div className="col">
                    <label
                      htmlFor="startDate"
                      className="form-label"
                      style={{ textAlign: "left", fontSize: "16px" }}
                    >
                      Start Date
                    </label>
                    <br />
                    <DatePicker
                      selected={formData.startDate}
                      onChange={handleStartDateChange}
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <br />
                    <DatePicker
                      selected={formData.endDate}
                      onChange={handleEndDateChange}
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleStartTimeChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleEndTimeChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ background: "green" }}
                  >
                    Submit
                  </button>
                  <Link to="/userlogin" className="btn btn-danger ms-2">
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardetails;
