import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

//*CUSTOM HOOK
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

//* LOAD USER get user data from back end and put in the state to validate authentication to access home page etc
export const loadUser = async (dispatch) => {
  try {
    //* route checking token for valid user
    const res = await axios.get('/api/auth');

    //* payload is the users data
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//* REGISTER USER to the backend handling token from routes/users.js
export const register = async (dispatch, formData) => {
  try {
    //* This response takes in url, formData and then returns a promise
    const res = await axios.post('/api/users', formData);

    //* Tell reducer the type and payload is the response which is the token
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    //* The loadUser() is grabbing the user from the db backend via token>dispatch the res.data
    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    });
  }
};

//* LOGIN USER
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    });
  }
};

//* LOGOUT
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

//* CLEAR ERRORS
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

//* AuthState Provider Component
 const AuthState = (props) => {
  //* token stored in local storage
  //* isAuthenticated - are we logged in
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  // * pulling out the state dispatch from reducer, state allows to  access anything in the state and dispatch allows to send objects to contactReducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // set token on initial app loading
  setAuthToken(state.token);

  // load user on first run or refresh
  if (state.loading) {
    loadUser(dispatch);
  }
  // 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    //* Wrapping whole application with the provider in app.js
    <AuthContext.Provider
      value={{
        state: state,
        dispatch
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
