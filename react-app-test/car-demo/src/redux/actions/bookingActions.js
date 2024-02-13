
import axios from 'axios';


// to fetch booking details for confirmation page
export const FETCH_BOOKING_REQUEST = 'FETCH_BOOKING_REQUEST';
export const FETCH_BOOKING_SUCCESS = 'FETCH_BOOKING_SUCCESS';
export const FETCH_BOOKING_FAILURE = 'FETCH_BOOKING_FAILURE';

export const fetchBookingRequest = () => ({
  type: FETCH_BOOKING_REQUEST
});

export const fetchBookingSuccess = (bookingDetails) => ({
  type: FETCH_BOOKING_SUCCESS,
  payload: bookingDetails
});

export const fetchBookingFailure = (error) => ({
  type: FETCH_BOOKING_FAILURE,
  payload: error
});
export const fetchBookingDetails = (bookingId) => {
  return async (dispatch) => {
    dispatch(fetchBookingRequest());
    try {
      const response = await axios.get(`http://localhost:5001/api/bookcar/${bookingId}`);
      dispatch(fetchBookingSuccess(response.data));
    } catch (error) {
      dispatch(fetchBookingFailure(error.message));
    }
  };
};




//for booking from cardetails page

export const BOOK_CAR_REQUEST = 'BOOK_CAR_REQUEST';
export const BOOK_CAR_SUCCESS = 'BOOK_CAR_SUCCESS';
export const BOOK_CAR_FAILURE = 'BOOK_CAR_FAILURE';

export const bookCarRequest = () => ({
  type: BOOK_CAR_REQUEST
});

export const bookCarSuccess = () => ({
  type: BOOK_CAR_SUCCESS
});

export const bookCarFailure = (error) => ({
  type: BOOK_CAR_FAILURE,
  payload: error
});

export const bookCar = (carId, bookingData) => {
  return async (dispatch) => {
    dispatch(bookCarRequest());
    try {
      const response = await axios.post('http://localhost:5001/api/bookcar', {
        carId,
        ...bookingData
      });
      if (response.data.success) {
        dispatch(bookCarSuccess());
      } else {
        dispatch(bookCarFailure("Booking failed"));
      }
    } catch (error) {
      dispatch(bookCarFailure(error.message));
    }
  };
};