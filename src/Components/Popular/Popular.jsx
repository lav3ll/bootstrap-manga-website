import React from 'react';
import Axios from 'axios';
import popularData from '../../Data/populatTest.json';

const Popular = () => {
  const reducedPopularData = popularData.data.splice(0, 5);
  console.log(reducedPopularData);
  return (
    <div className='row col-md-7 offset-md-2 my-4 bg-secondary rounded'>
      <p className='fw-semibold ms-2 my-3 text-white '>Popular</p>
      <div className='row justify-content-center'>
        {reducedPopularData.map((popularManga) => (
          <div
            className='card col-2 mx-2 px-0 bg-transparent'
            key={popularManga.id}
          >
            <img
              src={popularManga.thumbnail_url}
              alt={`thumbnail image of ${popularManga.title}`}
              className='poularImg'
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <p className='popularTitle'>{popularManga.title}</p>
            <p className='popularChapNum'>{popularManga.latest_chapter}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
