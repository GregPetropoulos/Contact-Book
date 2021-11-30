import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  //* Bring in useContext for the global state
  const contactContext = useContext(ContactContext);
  //* Bring in the delete method from contactContext
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  const { id, name, email, phone, type, notes, website, birthday } = contact;
  
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
          onClick={() => setCurrent(contact)}>
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
