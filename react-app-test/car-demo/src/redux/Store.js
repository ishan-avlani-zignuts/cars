import { createStore } from 'redux';
import rootReducer from './reducers'; // We'll create this in the next step

const store = createStore(rootReducer);

export default store;