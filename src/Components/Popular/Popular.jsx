import React from 'react';
import Axios from 'axios';
import popularData from '../../Data/populatTest.json';
import 

const Popular = () => {
  const reducedPopularData = popularData.data.splice(0, 5);
  // console.log(reducedPopularData);
  return (
    <div className='row col-md-7 offset-md-2 my-4 bg-secondary rounded'>
      <p className='fw-semibold ms-2 my-3 text-white'>Popular</p>
      <div className='row justify-content-center'>
        {reducedPopularData.map((popularManga) => (
          <div
            className='card col-2 mx-2 px-0 bg-transparent border-0'
            key={popularManga.id}
          >
            <img
              src={popularManga.thumbnail_url}
              alt={`thumbnail image of ${popularManga.title}`}
              className='poularImg'
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className='popularTxt pt-2 fw-semibold'>
              <p
                className='popularTitle text-white'
                style={{ height: '60px', overflow: 'hidden' }}
              >
                {popularManga.title.slice(0, 40)}
              </p>
              <p className='popularChapNum text-gray pt-0'>
                Chapter {popularManga.latest_chapter}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
