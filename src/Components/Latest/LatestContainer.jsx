import React from 'react';
import latestData from '../../Data/latestTestData.json';
import Latest from './Latest';

const LatestContainer = () => {
  // console.log(latestData);
  return (
    <div className='row col-lg-7 offset-lg-2 col-sm-1 col-md-12 my-4 bg-secondary rounded gx-3 justify-content-center'>
      <p className='fw-semibold ms-2 my-3 text-white'>Latest</p>
      <div className='row'>
        {latestData.data.map((latestManga, idx) => (
          <Latest key={latestManga.id} latestManga={latestManga} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default LatestContainer;
