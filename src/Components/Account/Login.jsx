import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1>Login</h1>

      <NavLink to='/Register' activeclassname='active' className=''>
        Register
      </NavLink>
    </>
  );
};

export default Login;
