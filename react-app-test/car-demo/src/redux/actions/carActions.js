import axios from 'axios';

//code for fetching car data 
export const fetchCarData = () => {
  return async dispatch => {
    try {
      const response = await axios.get("http://localhost:5001/api/displaydata");
      dispatch({ type: 'FETCH_CARS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: 'FETCH_CARS_FAILURE', payload: error });
    }
  };
};


// code for update car operation 
export const UPDATE_CAR_REQUEST = 'UPDATE_CAR_REQUEST';
export const UPDATE_CAR_SUCCESS = 'UPDATE_CAR_SUCCESS';
export const UPDATE_CAR_FAILURE = 'UPDATE_CAR_FAILURE';

export const updateCarRequest = () => ({
  type: UPDATE_CAR_REQUEST
});

export const updateCarSuccess = (car) => ({
  type: UPDATE_CAR_SUCCESS,
  payload: car
});

export const updateCarFailure = (error) => ({
  type: UPDATE_CAR_FAILURE,
  payload: error
});

export const updateCar = (carId, updatedCar) => {
  return async (dispatch) => {
    dispatch(updateCarRequest());
    try {
      const response = await axios.put(`http://localhost:5000/api/adminupdatecar/${carId}`, updatedCar);
      dispatch(updateCarSuccess(response.data));
    } catch (error) {
      dispatch(updateCarFailure(error.message));
    }
  };
};
