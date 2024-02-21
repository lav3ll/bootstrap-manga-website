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
      <div className='row mt-4'>
        {/* Column to control the width and position of the slider */}
        <div className='col-md-5 offset-md-2'>
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
              <img src={latestTestData.data[0].thumb} alt='test' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={latestTestData.data[1].thumb} alt='test' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={latestTestData.data[2].thumb} alt='test' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={latestTestData.data[3].thumb} alt='test' />
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
