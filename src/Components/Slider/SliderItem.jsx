import React from 'react';

const SliderItem = ({ imageData }) => {
  return (
    <div className='slide-container w-100'>
      <div className='mangaSlideInfo'>
        <p className=''></p>
      </div>
      <img
        src={imageData.thumbnail_url}
        alt={`${imageData.title} thumbnail image`}
        className='w-100 slide-img'
      />
      <div className='position-absolute top-50 end-0 translate-middle-y'>
        <img className='w-50 rounded' src={imageData.thumbnail_url} alt='' />
      </div>
    </div>
  );
};

export default SliderItem;
