import React, { useReducer, useContext } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

// Create a custom hook to use the contact context
export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux but they remain here for ease of students transitioning
//*GET CONTACTS-getting all of the users contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

//*ADD CONTACT
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact);

    //*dispatch will send the action.type, payload data
    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

//*DELETE CONTACT
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    //*dispatch will send the action.type, payload data
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

//*UPDATE CONTACT
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);
    //*dispatch will send the action.type, payload data is the contact
    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

//*CLEAR CONTACTS
export const clearContacts = (dispatch) => {
  dispatch({
    type: CLEAR_CONTACTS
  });
};

//*SET CURRENT CONTACT
export const setCurrent = (dispatch, contact) => {
  //*dispatch will send the action.type, payload data
  dispatch({ type: SET_CURRENT, payload: contact });
};

//*CLEAR CURRENT CONTACT
export const clearCurrent = (dispatch) => {
  //*dispatch will send the action.type, payload data, an object current null
  dispatch({ type: CLEAR_CURRENT });
};

//*FILTER CONTACTS
export const filterContacts = (dispatch, text) => {
  //* Display will send the action.type, payload data is the text entered by the user for the search of contacts
  dispatch({ type: FILTER_CONTACTS, payload: text });
};

//* CLEAR FILTER
export const clearFilter = (dispatch) => {
  //*dispatch will send the action.type, payload data, an object current null
  dispatch({ type: CLEAR_FILTER });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    //* When edit gets clicked it gets put into current object
    current: null,
    //* An array of filtered contacts
    filtered: null,
    error: null
  };
  
  //*These values are getting updated by the useContacts custom hook in any component they are placed in  
  // * pulling out the state dispatch from reducer, state allows to  access anything in the state and dispatch allows to send objects to contactReducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    //* Wrapping whole application with the provider
    <ContactContext.Provider
      value={{
        state: state,
        dispatch
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
