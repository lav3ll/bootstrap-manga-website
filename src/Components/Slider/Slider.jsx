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
    const baseUrl = 'https://api.mangadex.org';

    axios
      .get(`${baseUrl}/manga`, {
        params: {
          limit: '4',
          includedTagsMode: 'AND',
          excludedTagsMode: 'OR',
          status: ['ongoing'],
          availableTranslatedLanguage: ['en'],
          ids: [
            'f0f62b75-5989-4f32-9b59-ab56abe35fc1',
            '1f635177-dea1-4738-bfc2-f56cff912410',
            '00296c8d-a815-4fdd-b4b8-c79c550ee875',
            '26c8f00a-3925-4f22-ac21-83145be2b733',
          ],
          contentRating: ['safe'],
          order: {
            latestUploadedChapter: 'desc',
          },
          includes: ['cover_art'],
        },
      })
      .then((response) => {
        setSliderData(response.data.data);
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
