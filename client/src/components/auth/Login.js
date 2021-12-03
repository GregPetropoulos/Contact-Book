import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext'
import {useAuth, clearErrors, login} from '../../context/auth/AuthState'

//* Component level state for registering a user
const Login = () => {
  const alertContext = useContext(AlertContext);
  const {setAlert} =alertContext;

  //* Utilizing the custom hook and set state to error and isAuthenticated
  const [AuthState, authDispatch]= useAuth();
  const{error, isAuthenticated}=AuthState

  useEffect(()=> {
    //* see routes/auth to check backend error msg
    if(error === 'Invalid Credentials'){
      setAlert(error,'danger'); 
    clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, authDispatch, setAlert])
  
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  //* de-structure
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
if(email ==='' || password === ''){
  setAlert('Please fill in all fields', 'danger')
}else{
  //* redirects authenticated user to home page
  login(authDispatch, {
    email,
    password
  })
}
  };
if(isAuthenticated) return<Navigate to='/' />;

  return (
    <div className='from-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
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
            onChange={onChange}></input>
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
