import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

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

  //* Load User
  //* Register User
  //* Login User
  //* Logout
  //* Clear Error

  return (
    //* Wrapping whole application with the provider in app.js
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
