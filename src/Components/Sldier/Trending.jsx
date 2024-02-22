import React, { useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../Data/config.json';
import trendingTestData from '../../Data/getMangaTest.json';
const Trending = () => {
  const searchTerm = 'legendary';
  console.log(trendingTestData.data.thumb);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const options = {
  //         method: 'GET',
  //         url: 'https://mangaverse-api.p.rapidapi.com/manga/search',
  //         params: {
  //           text: `${searchTerm}}`,
  //           nsfw: 'false',
  //           type: 'all',
  //         },
  //         headers: {
  //           'X-RapidAPI-Key': API_KEY,
  //           'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com',
  //         },
  //       };

  //       try {
  //         const response = await axios.request(options);
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleClick = () => {
    // Function Needed to get clicked variable to then generate the landing page for said manga
    alert('click'); // testing
  };
  return (
    <div className='text-center trending d-none d-sm-block'>
      <div
        className='mx-2 rounded'
        style={{
          backgroundImage: `url(${trendingTestData.data.thumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '250px',
        }}
        onClick={handleClick}
      >
        <p className='fw-semibold lg-fs-1 md-fw-4 md-fs-4 text-white d-flex align-items-center justify-content-center pt-5 md-px-2 lg-px-2'>
          ELITE SCANS TRENDING THIS WEEK!
        </p>
        <p className='text-white pt-2 mt-2 px-4 fw-bold lg-fs-1 md-fw-4 md-fs-4'>
          {trendingTestData.data.title}
        </p>
      </div>
    </div>
  );
};

export default Trending;
