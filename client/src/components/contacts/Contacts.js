import React, { Fragment, useEffect } from 'react';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import { useContacts, getContacts } from '../../context/contact/ContactState';

import { motion, AnimatePresence } from 'framer-motion';

const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();

  //* Access to contacts and de-structured
  const { contacts, filtered } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  //*motion object
  const buttonVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };
  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null ? (
        filtered !== null ? (
          <AnimatePresence>
            {filtered.map((contact) => (
              <motion.div
                key={contact._id}
                variants={buttonVariant}
                layout
                initial='hidden'
                animate='visible'
                exit='exit'>
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            {contacts.map((contact) => (
              <motion.div
                key={contact._id}
                variants={buttonVariant}
                layout
                initial='hidden'
                animate='visible'
                exit='exit'>
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </AnimatePresence>
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
