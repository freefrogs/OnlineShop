import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import servicesReducer from './servicesReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  form: formReducer,
  products: productsReducer,
  product: productReducer,
  error: errorReducer,
  auth: authReducer,
  services: servicesReducer,
  contact: contactReducer
});
