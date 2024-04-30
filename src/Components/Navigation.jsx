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
    e.preventDefault();
    axios
      .get(
        `https://api.mangadex.org/manga?limit=10&title=${searchVal}&includedTagsMode=AND&excludedTagsMode=OR&availableTranslatedLanguage%5B%5D=en&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true`
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
          <NavLink
            to='/Login'
            className='btn btn-outline-dark btn-lg rounded-5 active'
          >
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
          <NavLink
            to='/Home'
            className='btn border-0 text-white fs-5 bold py-0'
          >
            <h1 className='fst-italic'>EliteScans</h1>
          </NavLink>
          <NavLink
            to='/Bookmarks'
            className='btn border-0 text-white fw-semibold'
          >
            Bookmarks
          </NavLink>
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
          <form
            className='d-flex w-25 me-5'
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
