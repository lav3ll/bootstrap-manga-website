import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

const Login = () => {
  const form = useRef();
  return (
    <div className='row'>
      <form
        ref={form}
        onSubmit=''
        className='d-flex flex-column gap-3 justify-content-center align-items-center bg-dark p-2 mt-5 rounded-1 col-4 offset-4'
      >
        <h1 className='mb-0 text-white fst-italic'>EliteScans</h1>
        <h2 className='mt-0 text-white fw-semibold'>Login</h2>
        <input
          className='form-control rounded-5'
          type='email'
          name='email'
          placeholder='Your Email'
          required
        />
        <input
          className='form-control rounded-5'
          type='password'
          name='password'
          placeholder='Password'
          required
        ></input>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
        <div className='text-white fw-semibold'>
          Don't have an account?{' '}
          <NavLink
            to='/Register'
            activeclassname='active'
            className='text-white'
          >
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
