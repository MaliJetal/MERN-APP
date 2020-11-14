import { GET_ERRORS } from './types';
import axios from 'axios';

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get User Token
export const registerUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to localstorage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem('jwtToken', token);
      //Set token to Auth Header
      setAuthToken(token);

    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};