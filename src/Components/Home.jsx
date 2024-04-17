import React from 'react';
import Slider from './Slider/Slider';
import PopularContainer from './Popular/PopularContainer';
import LatestContainer from './Latest/LatestContainer';
import StaffPicks from './StaffPicks/StaffPicks';

const Home = () => {
  return (
    <div className='row'>
      <div className='row col-9'>
        <Slider />
        <PopularContainer />
        <LatestContainer />
      </div>
      <div className='row col-3'>
        <StaffPicks />
      </div>
    </div>
  );
};

export default Home;
