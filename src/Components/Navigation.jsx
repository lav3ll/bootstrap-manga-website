import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <nav className='navbar navbar-dark navbar-expand-lg  nav-bg-primary bg-md-primary navbar-top custom-bg-secondary'>
      <div className='container-fluid'>
        {/* <!-- Nav burger bar --> */}
        <button
          className='navbar-toggler custom-toggler border-0'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#collapsingNavbar4'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* <!-- Nav burger bar end --> */}
        {<FontAwesomeIcon icon={faUser} />}
        <a
          href='https://www.google.com'
          className='navbar-brand ps-3 fs-3 fw-bold'
        >
          <i className='fa-solid fa-circle-user text-dark'></i>
        </a>
        {/* <!-- Nav user icon end --> */}

        {/* <!--Day/Night mode btn--> */}
        <div className='form-check form-switch me-auto fs-5'>
          <input
            className='form-check-input'
            type='checkbox'
            role='switch'
            id='flexSwitchCheckDefault'
            onClick={() => console.log('test')}
          />
          <label
            className='form-check-label fs-5'
            htmlFor='flexSwitchCheckDefault'
          ></label>
        </div>
        {/* <!--Day/Night mode btn--> */}

        {/* <!--Search Bar--> */}
        <form className='d-flex w-25 me-5' role='search' id='search'>
          <input
            className='form-control me-2 fw-semibold'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <i className='fa-solid fa-magnifying-glass my-auto'></i>
        </form>
      </div>

      {/* <!--End of search bar--> */}

      <div className='collapse navbar-collapse' id='collapsingNavbar4'>
        <ul className='navbar-nav ps-3 d-lg-none d-md-block bg-light bg-opacity-25'>
          <li className='nav-item'>
            <a
              className='nav-link fw-semibold active'
              aria-current='page'
              href='#'
            >
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link fw-semibold' href='#'>
              Bookmarks
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link fw-semibold' href='#'>
              Comics
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link fw-semibold' href='#'>
              Recruitment
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
