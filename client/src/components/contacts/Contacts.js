import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  // * This gives us access to the global state
  const contactContext = useContext(ContactContext);

  //* Access to contacts and de-structured
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please Add a contact</h4>;
  }
  return (
    <Fragment>
      {/* If there is something in filtered, map thru it and show the contactItem, otherwise if the filter is clear show all the contacts*/}
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))
        : contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
    </Fragment>
  );
};

export default Contacts;
