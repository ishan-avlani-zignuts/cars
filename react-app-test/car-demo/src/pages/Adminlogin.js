import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import Navbar from '../components/Navbar';
import axios from 'axios';

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/api/userlogin", data);
      const json = response.data;

      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        dispatch(loginUser(json.authToken));
        navigate("/admindashboard");
      } else {
        alert("Invalid inputs");
      }
    } catch (error) {
     // console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh', backgroundColor: '#16202c' }}>
        <div className="card p-4" style={{ width: '400px', backgroundColor: 'white' }}>
          <h1 className="text-center mb-4 heading">Admin Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="text" className="form-control" id="email" {...register("email", { required: true })} />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
              {errors.password && <span>This field is required</span>}
            </div>
            <button type="submit" className="btn btn-success" style={{ background: "green" }}>Submit</button>
            <Link to="/usersignup" className="btn btn-danger ms-2">New User ?</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;