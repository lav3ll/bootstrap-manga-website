import React from 'react';
import Trending from './Trending';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import latestTestData from '../../Data/latestTestData.json';

const Slider = () => {
  return (
    <>
      {/* Container for the slider */}
      <div className='row mt-4 w-100 swiper-con'>
        {/* Column to control the width and position of the slider */}
        <div className='col-md-12 col-lg-5 offset-lg-2 custom-sm-width ms-lg-6'>
          {/* Swiper component with configuration */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper rounded'
          >
            {/* Slides inside the Swiper */}
            <SwiperSlide>
              <div className='slide-container w-100'>
                <div className='mangaSlideInfo'>
                  <p className=''></p>
                </div>
                <img
                  src={latestTestData.data[5].thumbnail_url}
                  alt={`${latestTestData.data[5].title} thumbnail image`}
                  className='w-100 slide-img'
                />
                <div className='position-absolute top-50 end-0 translate-middle-y'>
                  <img
                    className='w-50 rounded'
                    src={latestTestData.data[5].thumbnail_url}
                    alt=''
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='slide-container w-100'>
                <div className='mangaSlideInfo'>
                  <p className=''></p>
                </div>
                <img
                  src={latestTestData.data[16].thumbnail_url}
                  alt={`${latestTestData.data[16].title} thumbnail image`}
                  className='w-100 slide-img'
                />
                <div className='position-absolute top-50 end-0 translate-middle-y'>
                  <img
                    className='w-50 rounded'
                    src={latestTestData.data[16].thumbnail_url}
                    alt=''
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='slide-container w-100'>
                <div className='mangaSlideInfo'>
                  <p className=''></p>
                </div>
                <img
                  src={latestTestData.data[10].thumbnail_url}
                  alt={`${latestTestData.data[10].title} thumbnail image`}
                  className='w-100 slide-img'
                />
                <div className='position-absolute top-50 end-0 translate-middle-y'>
                  <img
                    className='w-50 rounded'
                    src={latestTestData.data[10].thumbnail_url}
                    alt=''
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='slide-container w-100'>
                <div className='mangaSlideInfo'>
                  <p className=''></p>
                </div>
                <img
                  src={latestTestData.data[12].thumbnail_url}
                  alt={`${latestTestData.data[12].title} thumbnail image`}
                  className='w-100 slide-img'
                />
                <div className='position-absolute top-50 end-0 translate-middle-y'>
                  <img
                    className='w-50 rounded'
                    src={latestTestData.data[12].thumbnail_url}
                    alt=''
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='trending col-md-2'>
          <Trending />
        </div>
      </div>
    </>
  );
};

export default Slider;
