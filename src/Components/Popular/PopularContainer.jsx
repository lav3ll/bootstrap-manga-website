import React from 'react';
import popularData from '../../Data/popularTest.json';
import Popular from './Popular';

const PopularContainer = () => {
  const reducedPopularData = popularData.data.slice(0, 5);

  return (
    <div className='row col-lg-7 offset-lg-2 col-sm-1 col-md-12 col-12 my-4 bg-secondary rounded gx-3 justify-content-center'>
      <p className='fw-semibold ms-2 my-3 text-white'>Popular</p>
      <div className='row justify-content-center'>
        {reducedPopularData.map((popularManga, idx) => (
          <Popular
            key={popularManga.id}
            popularManga={popularManga}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularContainer;
