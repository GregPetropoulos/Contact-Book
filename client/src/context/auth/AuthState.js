import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';

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

  //* LOAD USER
  const loadUser = () => console.log('load user');

  //* REGISTER USER to the backend handling token from routes/users.js
  const register = async (formData) => {
    //* Headers for post request, sending data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      //* This response takes in url, formData and config, then returns a promise
      const res = await axios.post('/api/users', formData, config);

      //* Tell reducer the type and payload is the response which is the token
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  //* LOGIN USER
  const login = () => console.log('login');

  //* LOGOUT
  const logout = () => console.log('logout');

  //* CLEAR ERRORS
  const clearErrors = () => dispatch ({ type: CLEAR_ERRORS})

  return (
    //* Wrapping whole application with the provider in app.js
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
