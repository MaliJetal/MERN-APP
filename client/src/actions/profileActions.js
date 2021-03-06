import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from "./types";
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

//Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`./api/profile/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}

//Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('api/profile', profileData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.resposne.data
      })
    );
}

//Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('api/profile/experience', expData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.resposne.data
      })
    );
}

//Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('api/profile/education', eduData)
    .then(res => history.push('./dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.resposne.data
      })
    );
}

//Delete Experience
export const deleteExperience = (id) => dispatch => {
  axios
    .delete(`api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.resposne.data
      })
    );
}

export const deleteEducation = (id) => dispatch => {
  axios
    .delete(`api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.resposne.data
      })
    );
}

//Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//Delete Account and Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone.")) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//Clear Current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}