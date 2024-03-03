import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowRight } from 'react-icons/md';
import './MangaInfo.css';
import MangaInfo from '../../Data/getMangaTest.json';

const MangaInfo = ({}) => {
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
            to={{ pathname: `/${MangaInfo}` }}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            EliteScans
          </Link>
        </div>
        <div className='row manga-info-container row col-7 offset-1'>
          <div className='col-5 bg-light rounded'>TEST</div>
          <div className='bg-dark rounded col-7'>TEST</div>
        </div>
      </div>
    </>
  );
};

export default MangaInfo;
