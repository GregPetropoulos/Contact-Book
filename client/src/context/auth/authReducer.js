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

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      //* Storing the actual token response into local storage
      localStorage.setItem('token', action.payload.token);
//* take and spread the current state with token (action.payload)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
case REGISTER_FAIL:
    //* Re-set the state, remove the token from localstorage 
    localStorage.removeItem('token');
    return{
        ...state,
        token:null,
        isAuthenticated:false,
        loading:false,
        user:null,
        //* The new payload is error, see AuthState and routes/users.js
        error: action.payload
    }
    case CLEAR_ERRORS:
        return {
            ...state,
            error:null
        };
    default:
      return state;
  }
};
