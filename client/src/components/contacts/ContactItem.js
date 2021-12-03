import React from 'react';
import PropTypes from 'prop-types';
import {useContacts, deleteContact, setCurrent, clearCurrent } from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  //* we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  const { _id, name, email, phone, type, notes, website, birthday } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };



  return (
    <div className='card bg-light'>
      <h3 className='text primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
        {website && (
          <li>
            <i className='fas fa-globe' /> <a href={website}>{website}</a>
          </li>
        )}
        {notes && (
          <li>
            <i className='fas fa-sticky-note' /> {notes}
          </li>
        )}
        {birthday && (
          <li>
            <i className='fas fa-birthday-cake' /> {birthday}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};
export default ContactItem;
