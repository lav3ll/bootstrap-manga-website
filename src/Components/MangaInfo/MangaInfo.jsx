import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Update import
import { MdOutlineArrowRight } from 'react-icons/md';
import './MangaInfo.css';

const Info = MangaInf.data;

const MangaInfo = () => {
  const location = useLocation();
  const { manga } = location.state;
  console.log(manga);
  const saveBookmark = () => {
    alert('saved to local storage');
  };

  const genreSearch = () => {
    alert('search for genre');
  };

  return (
    <>
      <div className='manga-info-wrapper'>
        <div className='col-7 offset-1 manga-info-toplinks mt-4 mb-3 bg-secondary rounded px-2'>
          <Link
            to={{ pathname: '/' }}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            EliteScans
          </Link>{' '}
          <MdOutlineArrowRight />
          <Link
            to={{ pathname: `/${Info}` }}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            EliteScans
          </Link>
        </div>
        <div className='row manga-info-container row col-7 offset-1'>
          <div className='col-5 bg-light rounded row text-center'>
            <img src={manga.coverImg} alt='test' />
            <button
              className='btn custom-bg-secondary mt-2 text-white fw-semibold'
              onClick={saveBookmark}
            >
              {' '}
              Bookmark
            </button>
            <p className='status my-1 fw-semibold bg-secondary rounded py-1'>
              {manga.info.attributes.status === ''
                ? 'Unknown'
                : manga.info.attributes.status}
            </p>
            <p className='type my-1 fw-semibold bg-secondary rounded py-1'>
              {manga.info.attributes.type
                ? manga.info.attributes.type
                : 'Unknown'}
            </p>
          </div>
          <div className='bg-dark rounded ms-4 col-7'>
            <div className='info-mid-topcol'>
              <h2 className='text-white mx-2 my-3'>
                {manga.info.attributes.title.en}
              </h2>
              <p className='text-white mx-2'>
                Synopsis {manga.info.attributes.title.en}
              </p>
              <p className='text-white mx-2'>
                {manga.info.attributes.description.en.slice(0, 282)}
              </p>
            </div>
            <div className='info-mid-botcol'>
              <p className='text-white ps-2 mb-0 pt-3'>Genres</p>
              {manga.info.attributes.tags.map((genre, index) => (
                <button
                  key={index}
                  className='btn text-white fs-6 px-1 bg-secondary mx-1 my-1 border-0'
                  onClick={genreSearch}
                >
                  {genre.attributes.name.en}
                </button>
              ))}
            </div>
          </div>
        </div>
        <img src='' alt='TEST' />
      </div>
    </>
  );
};

export default MangaInfo;
