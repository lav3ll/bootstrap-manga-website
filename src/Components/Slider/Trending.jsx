import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../../Data/config.json';
// import trendingTestData from '../../Data/popularTest.json';
const Trending = () => {
  // Initialize trendingManga state with useState
  const [trendingManga, setTrendingManga] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const baseUrl = 'https://api.mangadex.org';

      try {
        const resp = await axios.get(`${baseUrl}/manga/random`, {
          params: {
            includes: ['cover_art', 'artist', 'author'],
            'contentRating[]': ['safe'],
          },
        });

        // Store the fetched data in component state
        setTrendingManga(resp.data.data);
        resp.data.data;
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchTrending();
  }, []);

  const handleClick = () => {
    // Function Needed to get clicked variable to then generate the landing page for said manga
    alert('click'); // testing
  };

  return (
    <div className='text-center trending d-none d-sm-none md-d-none d-lg-block'>
      {/* Conditionally render the JSX content */}
      {trendingManga && (
        <div
          className='mx-2 rounded'
          style={{
            backgroundImage: `url(${`https://uploads.mangadex.org/covers/${trendingManga.id}/${trendingManga.relationships[2].attributes.fileName}.256.jpg`})`,
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
            {trendingManga.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Trending;
