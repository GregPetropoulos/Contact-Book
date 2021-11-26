import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
        website: 'www.jill.com',
        notes: 'met at the convention',
        birthday: '12/12/2000'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'swatson@gmail.com',
        phone: '222-222-2222',
        type: 'personal',
        website: 'www.swat.com',
        notes: 'made the olympics',
        birthday: '2/24/1994'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'whitehair@gmail.com',
        phone: '333-333-3333',
        type: 'professional',
        website: 'www.whiteharry.com',
        notes: 'likes to fence',
        birthday: '4/4/1964'
      }
    ],
    //* When edit gets clicked it gets put into current object
    current: null
  };
  // * pulling out the state dispatch from reducer, state allows to  access anything in the state and dispatch allows to send objects to contactReducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //* Add Contact
  const addContact = (contact) => {
    //* When contact submitted in form with useContext assign this uuid to it
    contact.id = uuidv4();
    //*dispatch will send the action.type, payload data
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //* Delete Contact
  const deleteContact = (id) => {
    //*dispatch will send the action.type, payload data
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //* Set Current Contact
  const setCurrent = (contact) => {
    //*dispatch will send the action.type, payload data
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //* Clear Current Contact
  const clearCurrent = () => {
    //*dispatch will send the action.type, payload data, an object current null
    dispatch({ type: CLEAR_CURRENT });
  };

  //* Update Contact
  const updateContact = (contact) => {
    //*dispatch will send the action.type, payload data is the contact
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //* Filter Contact

  //* Clear Filter

  return (
    //* Wrapping whole application with the provider
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
