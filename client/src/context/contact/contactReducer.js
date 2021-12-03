import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from '../types';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state, 
        contacts:action.payload
      }
    case ADD_CONTACT:
      return {
        //* return current state
        ...state,
        //* Must use spread operator to make a copy of the state(state is immutable), also send the data from the payload to update copied state in UI
        contacts: [action.payload, ...state.contacts]
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          //* Return all id that do not match the action payload (the id of the delete button clicked on in the ui)
          (contact) => contact._id !== action.payload
        ),
        //* When filtering and clicking delete removes the contact from ui
        filtered:
        state.filtered !== null? state.filtered.filter((contact) => contact._id !== action.payload): null,
      };
      case CLEAR_CONTACTS:
        return{
          ...state,
          contacts:null,
          filtered: null,
          error:null, 
          current: null
        }
        
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
    case FILTER_CONTACTS:
      return {
        ...state,
        //* Take filtered part of state set to initial contacts and run filter method on it
        filtered: state.contacts.filter(({name, email}) => {
          // regex a the text match of the payload, gi means global case insensitive(any case)
        //  const regex = new RegExp(`${action.payload}`, 'gi');
        //  return contact.name.match(regex) || contact.email.match(regex)
        const testString =`${name}${email}`.toLowerCase();
        return testString.includes(action.payload.toLowerCase());
        })
      };
      case CLEAR_FILTER:
        return {
          ...state,
          //* return filtered back to null and clears the form
          filtered: null
        };
        case CONTACT_ERROR:
          return {
            ...state, 
            error:action.payload
          }
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};
export default contactReducer;