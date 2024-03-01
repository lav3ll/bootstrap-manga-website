import React, { useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../Data/config.json';
import trendingTestData from '../../Data/popularTest.json';
const Trending = () => {
  const randomTrending =
    trendingTestData.data[
      Math.trunc(Math.random() * trendingTestData.data.length)
    ];
  console.log(randomTrending);
  const handleClick = () => {
    // Function Needed to get clicked variable to then generate the landing page for said manga
    alert('click'); // testing
  };
  return (
    <div className='text-center trending d-none d-sm-none md-d-none d-lg-block'>
      <div
        className='mx-2 rounded'
        style={{
          backgroundImage: `url(${randomTrending.thumbnail_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '250px',
        }}
        onClick={handleClick}
      >
        <p className='fw-semibold lg-fs-1 md-fw-4 md-fs-4 text-white d-flex align-items-center justify-content-center pt-5 md-px-2 lg-px-2'>
          ELITE SCANS TRENDING THIS WEEK!
        </p>
        <p className='text-white pt-2 mt-2 px-4 fw-bold lg-fs-1 md-fw-4 md-fs-4'>
          {randomTrending.title}
        </p>
      </div>
    </div>
  );
};

export default Trending;
