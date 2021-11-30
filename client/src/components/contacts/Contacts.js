import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

//* Docs at https://reactcommunity.org/react-transition-group/transition-group
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { motion, AnimatePresence } from 'framer-motion';

const Contacts = () => {
  // * This gives us access to the global state
  const contactContext = useContext(ContactContext);

  //* Access to contacts and de-structured
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please Add a contact</h4>;
  }

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

  return (
    <Fragment>
      {filtered !== null ? (
        <AnimatePresence>
          {filtered.map((contact) => (
            <motion.div
              key={contact.id}
              variants={buttonVariant}
              layout
              initial='hidden'
              animate='visible'
              exit='exit'
              >
              <ContactItem contact={contact}/>
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (<AnimatePresence>

        {contacts.map((contact) => (
          <motion.div
            key={contact.id}
            variants={buttonVariant}
            layout
            initial='hidden'
            animate='visible'
            exit='exit'
            >
            <ContactItem contact={contact} />
          </motion.div>
        ))}
              </AnimatePresence>
      )}
    </Fragment>
  );
};

export default Contacts;
