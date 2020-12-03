import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, PROFILE_NOT_FOUND, CLEAR_CURRENT_PROFILE } from "./types";
import axios from 'axios';

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('./api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}