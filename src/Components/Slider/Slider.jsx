import React from 'react';
import Trending from './Trending';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderItem from './SliderItem';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';

import './Slider.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const baseUrl =
      'https://elitescans-data-a61945b29883.herokuapp.com/api/mangadex';

    axios
      .get(`${baseUrl}/featured`)
      .then((response) => {
        setSliderData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {/* Container for the slider */}
      <div className='row mt-4 w-100 swiper-con'>
        {/* Column to control the width and position of the slider */}
        <div className='col-md-12 col-lg-8 offset-lg-1 custom-sm-width ms-lg-6'>
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

            {sliderData.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <SliderItem imageData={slide} />
              </SwiperSlide>
            ))}
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
