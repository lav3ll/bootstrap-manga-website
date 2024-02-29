import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const AccountModal = ({ ModalType }) => {
  const form = useRef();
  const [errorTxt, setErrorTxt] = useState('');
  const [hidePass, setHidePass] = useState('d-none');
  const [hideUsername, setUsername] = useState('d-none');

  useEffect(() => {
    setHidePass(ModalType === 'Register' ? '' : 'd-none');
    setUsername(ModalType === 'Register' ? '' : 'd-none');
  }, [ModalType]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const password1 = form.current.elements.password1.value;
    const password2 = form.current.elements.password2.value;

    if (password1 !== password2) {
      setErrorTxt('* Password confirmation does not match password');
    } else if (
      password1.length < 8 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password1)
    ) {
      setErrorTxt(
        '* Password must be at least 8 characters long and contain at least one special character'
      );
    } else {
      // Handle form submission
      setErrorTxt('');
      alert('Form submitted successfully');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const password = form.current.elements.password1.value;
    const email = form.current.elements.email.value;
    const databasePass = ''; // Replace with your database password
    const databaseUser = ''; // Replace with your database username

    if (password !== databasePass || email !== databaseUser) {
      setErrorTxt('* Incorrect email or password');
    } else {
      // Handle form submission
      setErrorTxt('');
      alert('You have logged in successfully');
    }
  };

  const handleSubmit =
    ModalType === 'Login' ? handleLoginSubmit : handleRegisterSubmit;

  return (
    <div className='row'>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className='d-flex flex-column gap-3 justify-content-center align-items-center bg-dark p-2 mt-5 rounded-1 col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-10 offset-1'
      >
        <h1 className='mb-0 text-white fst-italic'>EliteScans</h1>
        <h2 className='mt-0 text-white fw-semibold'>{ModalType}</h2>
        {ModalType === 'Register' && (
          <input
            className={`form-control rounded-5 ${hideUsername}`}
            text='username'
            name='username'
            placeholder='Create a username'
            required
          />
        )}
        <input
          className='form-control rounded-5'
          type='email'
          name='email'
          id='email'
          placeholder='Your Email'
          required
        />
        <input
          className='form-control rounded-5'
          name='password1'
          type='password'
          placeholder='Password'
          required
        />
        {ModalType === 'Register' && (
          <input
            className={`form-control rounded-5 ${hidePass}`}
            name='password2'
            type='password'
            placeholder='Confirm Password'
            required
          />
        )}
        <p className='text-warning'>{errorTxt}</p>
        <button type='submit' className='btn btn-primary'>
          {ModalType}
        </button>
        {ModalType === 'Login' ? (
          <div className='text-white fw-semibold'>
            Don't have an account?{' '}
            <NavLink to='/Register' className='text-white'>
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div className='text-white fw-semibold'>
            Already have an account?{' '}
            <NavLink to='/Login' className='text-white'>
              Sign In
            </NavLink>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountModal;
