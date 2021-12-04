import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useContacts, clearContacts } from '../../context/contact/ContactState';

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  //* 
  //* we just need the contact dispatch without state, just to clear out the contacts if a user logs out.No need to update  any state from ContactState
  const contactDispatch = useContacts()[1];
  //const [ _, contactDispatch ] = useContacts() //*This does the same

  const onLogout = () => {
    logout(authDispatch);
    clearContacts(contactDispatch);
  };

  const authLinks = (
    <Fragment>
      <h2><li>Hello {user && user.name}</li></h2>
      <li>
        <Link onClick={onLogout} to='/login'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      {/* Add more page links here if needed */}
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Book',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
