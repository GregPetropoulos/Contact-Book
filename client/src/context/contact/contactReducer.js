import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        //* return current state
        ...state,
        //* Must use spread operator to make a copy of the state(state is immutable), also send the data from the payload to update copied state in UI
        contacts: [...state.contacts, action.payload]
      };
      case UPDATE_CONTACT:
        return {
          ...state, 
          contacts:state.contacts.map(contact => contact.id === action.payload.id? action.payload:contact)
        }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          //* Return all id that do not match the action payload (the id of the delete button clicked on in the ui)
          (contact) => contact.id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        //* return the entire contact object from the payload which is the current object
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        //* return current back to null and clears the form 
        current: null
      };
    default:
      return state;
  }
};
