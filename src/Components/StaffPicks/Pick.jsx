import React from 'react';

const Pick = ({ staffManga, index }) => {
  console.log(staffManga);
  return (
    <div className='card my-2'>
      <div className='card-body row'>
        <p className='col-2'>{index + 1}</p>
        <img
          className='card-img-top w-25 col-4'
          src='...'
          alt='Card image cap'
        />

        <p className='card-text col-7'>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default Pick;
