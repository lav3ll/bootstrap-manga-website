import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowRight } from 'react-icons/md';

const MangaInfo = ({ MangaInfo }) => {
  return (
    <>
      <div className='manga-info-toplinks'>
        <Link to={{ pathname: '/' }}>EliteScans</Link> <MdOutlineArrowRight />
        <Link to={{ pathname: '/' }}>EliteScans</Link>
      </div>
      <div className='row manga-info-container'>
        <div className='col-3 bg-light'>TEST</div>
        <div className='col-9 bg-dark'>TEST</div>
      </div>
    </>
  );
};

export default MangaInfo;
