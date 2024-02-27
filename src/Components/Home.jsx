import React from 'react';
import Slider from './Sldier/Slider';
import PopularContainer from './Popular/PopularContainer';
import LatestContainer from './Latest/LatestContainer';

const Home = () => {
  return (
    <>
      <Slider />
      <PopularContainer />
      <LatestContainer />
    </>
  );
};

export default Home;
