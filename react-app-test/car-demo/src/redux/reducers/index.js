// src/redux/reducers/index.js
import { combineReducers } from 'redux';
// Import your reducers here
// For now, let's create a placeholder reducer
const placeholderReducer = (state = {}, action) => {
  return state;
};

const rootReducer = combineReducers({
  // Add your reducers here
  placeholder: placeholderReducer,
});

export default rootReducer;
