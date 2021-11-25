import React, { useState, useContext } from 'react';
//* Component level state for the form useState

//* To gain access to Add Contacts will need to useContext Global
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  //*Global state
  const contactContext = useContext(ContactContext);

  //* Set up hook initial values for component form state
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
    notes: '',
    website: '',
    birthday: ''
  });
  //* de-structure contact to use in the form below
  const { name, email, phone, type, notes, website, birthday } = contact;

  //* onChange by updating the state with spread operator to include all of the contact by [name key]: value
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    contactContext.addContact(contact);

    //* clear form
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
      notes: '',
      website: '',
      birthday: ''
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Contact</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <h3>
        <input
          type='tel'
          placeholder='Phone'
          name='phone'
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          value={phone}
          onChange={onChange}
        />
      </h3>
      <h3>Contact Type</h3>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional{' '}
      <textarea
        type='text'
        placeholder='Notes'
        name='notes'
        value={notes}
        onChange={onChange}
      />{' '}
      <h3>
        <label htmlFor='website'>Website: </label>{' '}
        <input
          type='url'
          placeholder='https://mywebsite.com'
          name='website'
          value={website}
          onChange={onChange}
        />
      </h3>
      <h3>
        <label htmlFor='birthday'>Birthday:</label>
        <input
          type='date'
          name='birthday'
          value={birthday}
          onChange={onChange}
        />
      </h3>
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ContactForm;
