import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  
  //* The alert is an empty array 
  const initialState = [];
  
  // * pulling out the state dispatch from reducer, state allows to  access anything in the state and dispatch allows to send objects to contactReducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //* Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    //* Wrapping whole application with the provider in app.js
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
