import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SearchResult from './Search/SearchResult';

const Navigation = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleCloseResults = () => {
    setSearchResults([]);
    setSearchVal('');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    closeModal();
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

  const handleMouseOut = () => {
    mouseOut();
  };

  const handleSubmit = (e) => {
    const lowerCaseSearchVal = searchVal.toLowerCase();
    e.preventDefault();
    axios
      .get(
        `https://api.mangadex.org/manga?limit=10&title=${lowerCaseSearchVal}&includedTagsMode=AND&excludedTagsMode=OR&availableTranslatedLanguage%5B%5D=en&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true`
      )
      .then((res) => {
        res.data.data.length > 0
          ? setSearchResults(res.data.data)
          : openModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <nav className='navbar navbar-dark navbar-expand-lg  nav-bg-primary bg-md-primary navbar-top custom-bg-secondary'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler bg-primary border-0'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          {/* Moved the comment outside the JSX element */}
          <NavLink
            to='/Login'
            className='btn btn-outline-dark btn-lg rounded-5 active'
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
            className='btn border-0 text-white fw-semibold ms-auto d-none d-md-block'
          >
            Bookmarks
          </NavLink>
          <form
            className='d-flex w-25 w-sm-25 w-md-25 me-5'
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
        </div>
      </nav>
      <div
        className='ms-auto me-5 w-25 custom-bg-secondary results-container'
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
      {/* Modal */}
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

      {/* Modal backdrop */}
      <div
        className={`modal-backdrop fade ${isModalOpen ? 'show' : ''}`}
        style={{ display: isModalOpen ? 'block' : 'none' }}
      ></div>
    </>
  );
};

export default Navigation;
