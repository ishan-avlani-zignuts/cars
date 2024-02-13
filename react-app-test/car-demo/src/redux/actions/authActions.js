import { LOGIN_ADMIN } from "../authActionTypes";
import axios from 'axios'; 

export const loginUser = (userData) => {
    return {
      type: 'LOGIN_USER',
      payload: userData,
    };
  };
  
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    };
  };
  
  export const userSignup = (authToken) => {
    return {
      type: 'USER_SIGNUP',
      payload: authToken,
    };
  };

//Adminlogin api code

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5001/api/userlogin", formData);
    const json = response.data;

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      dispatch({ type: LOGIN_ADMIN, payload: json.authToken });
      navigate("/admindashboard");
    } else {
      alert("Invalid inputs");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};