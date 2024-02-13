import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userSignup } from '../redux/actions/authActions';
import Navbar from '../components/Navbar';
import axios from 'axios';

function UserSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data, { reset }) => {
    try {
      const response = await axios.post("http://localhost:5001/api/usersignup", data);
      const json = response.data;

      if (json.success) {
        alert("Data added successfully");
        dispatch(userSignup(json.authToken));
        navigate("/userlogin");
      } else {
        alert("Invalid inputs");
      }
    } catch (error) {
     // console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh', backgroundColor: '#16202c' }}>
        <div className="card p-4" style={{ width: '400px', backgroundColor: 'white' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="text" className="form-control" id="email" {...register("email", { required: true })} />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Number</label>
              <input type="text" className="form-control" id="number" {...register("number", { required: true })} />
              {errors.number && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
              {errors.password && <span>This field is required</span>}
            </div>
            <button type="submit" className="btn btn-success" style={{ background: "green" }}>Submit</button>
            <Link to="/userlogin" className="btn btn-danger ms-2">Back</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
