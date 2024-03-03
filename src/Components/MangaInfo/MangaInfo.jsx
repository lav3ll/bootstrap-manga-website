import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowRight } from 'react-icons/md';
import './MangaInfo.css';
import MangaInf from '../../Data/getMangaTest.json';
const Info = MangaInf.data;
const MangaInfo = ({}) => {
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
            <img src={Info.thumb} alt='test' />
            <button
              className='btn custom-bg-secondary mt-2 text-white fw-semibold'
              onClick={saveBookmark}
            >
              {' '}
              Bookmark
            </button>
            <p className='status my-1 fw-semibold bg-secondary rounded py-1'>
              {Info.status === '' ? 'Unknown' : Info.status}
            </p>
            <p className='type my-1 fw-semibold bg-secondary rounded py-1'>
              {Info.type}
            </p>
          </div>
          <div className='bg-dark rounded ms-4 col-7'>
            <div className='info-mid-topcol'>
              <h2 className='text-white mx-2 my-3'>{Info.title}</h2>
              <p className='text-white mx-2'>Synopsis {Info.title}</p>
              <p className='text-white mx-2'>{Info.summary.slice(0, 282)}</p>
            </div>
            <div className='info-mid-botcol'>
              {Info.genres.map((genre, index) => (
                <button
                  key={index}
                  className='btn text-white fs-6 px-1'
                  onClick={genreSearch}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaInfo;
