import React from 'react';
import Trending from './Trending';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderItem from './SliderItem';

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
              <SliderItem imageData={latestTestData.data[5]} />
            </SwiperSlide>
            <SwiperSlide>
              <SliderItem imageData={latestTestData.data[16]} />
            </SwiperSlide>
            <SwiperSlide>
              <SliderItem imageData={latestTestData.data[10]} />
            </SwiperSlide>
            <SwiperSlide>
              <SliderItem imageData={latestTestData.data[12]} />
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
