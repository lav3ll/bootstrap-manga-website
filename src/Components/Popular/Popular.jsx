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
        <div className='card col-2 mx-2'>
          <img src='' alt='test img' className='poularImg' />
          <p className='popularTitle'>Manga Title</p>
          <p className='popularChapNum'>Chapter Number</p>
        </div>
      </div>
    </div>
  );
};

export default Popular;
