import React, { useState, useContext, useEffect } from 'react';

//* In react-router-dom v6 history is not used anymore.

import { Navigate } from 'react-router-dom';

//* Brought in the Alerts
import AlertContext from '../../context/alert/alertContext';

//* Brought in AuthContext for handling the token
import { useAuth, clearErrors, register } from '../../context/auth/AuthState'

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  //* Anytime an error changes run it
  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      //* clear errors will run after useEffect fires off, hits the AuthState, then gets dispatched to the reducer and executed here.
      clearErrors(authDispatch);
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  //* Component level state for registering a user
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  //* de-structure
  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    //* The required prop in the input tag is also handling the ui on the alerts, use both or either

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      //* From authContext>AuthState register takes in the formData
      register(authDispatch, {
        name,
        email,
        password
      });
    }
  };

  //* Redirect loaded user to home page
  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className='from-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            required
            onChange={onChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            required
            onChange={onChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            required
            minLength='6'
            onChange={onChange}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            required
            minLength='6'
            onChange={onChange}></input>
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
