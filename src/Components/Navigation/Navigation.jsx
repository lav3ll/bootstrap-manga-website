import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../Search/SearchResult';
import 'bootstrap/js/dist/collapse';
import './Navigation.css';

const Navigation = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseResults = () => {
    setSearchResults([]);
    setSearchVal('');
  };

  const openModal = () => {
    setIsModalOpen(true);
    closeModal();
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    const lowerCaseSearchVal = searchVal.toLowerCase();
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/search/manga`, {
        params: {
          title: lowerCaseSearchVal, // Pass the search value as a parameter
          limit: 10,
        },
      })
      .then((res) => {
        res.data.length > 0 ? setSearchResults(res.data) : openModal();
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <>
      <nav className='navbar navbar-dark navbar-expand-lg nav-bg-primary bg-md-primary navbar-top custom-custom-secondary-bg-color'>
        <div className='container-fluid'>
          <NavLink
            to='/Login'
            className='btn btn-outline-dark btn-lg rounded-5 active d-none d-md-none  d-lg-block'
          >
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          <NavLink
            to='/Home'
            className='btn border-0 text-white fs-5 bold py-0 d-none d-md-block'
          >
            <h1 className='fs-italic'>EliteScans</h1>
          </NavLink>
          <NavLink
            to='/Bookmarks'
            className='btn border-0 text-white fw-semibold ms-auto d-none d-md-none'
          >
            Bookmarks
          </NavLink>
          <form
            className='d-flex search-custom-width me-auto' // Changed w-50 to w-100
            role='search'
            id='search'
            onSubmit={handleSubmit}
          >
            <input
              className='form-control me-2 fw-semibold'
              type='search'
              placeholder='Search'
              aria-label='Search'
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>
          <button
            className='navbar-toggler custom-custom-secondary-bg-color border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink
                  to='/Login'
                  className='nav-link d-sm-block d-md-block d-lg-none fw-semibold text-white'
                >
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  to='/Register'
                  className='nav-link d-sm-block d-md-block d-lg-none fw-semibold text-white'
                >
                  Register
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  to='/Bookmarks'
                  className='nav-link d-sm-block d-md-block d-lg-block text-white fw-semibold'
                >
                  Bookmarks
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className='ms-auto custom-custom-secondary-bg-color results-container'
        onMouseLeave={handleCloseResults}
      >
        {searchResults &&
          searchResults.map((result, idx) => (
            <SearchResult
              key={idx}
              sResult={result}
              onClose={handleCloseResults}
            />
          ))}
      </div>
      <div
        className={`modal ${isModalOpen ? 'show' : ''}`}
        tabIndex='-1'
        style={{ display: isModalOpen ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body text-center'>
              <p>No results found</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${isModalOpen ? 'show' : ''}`}
        style={{ display: isModalOpen ? 'block' : 'none' }}
      ></div>
    </>
  );
};

export default Navigation;
