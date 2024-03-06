import React, { useEffect, useState } from 'react';
import Popular from './Popular';
import axios from 'axios';

const PopularContainer = () => {
  const [reducedPopularData, setReducedPopularData] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const baseUrl = 'https://api.mangadex.org';

      try {
        const resp = await axios.get(`${baseUrl}/manga`, {
          params: {
            includes: ['cover_art', 'artist', 'author'],
            order: { followedCount: 'desc' },
            'contentRating[]': ['safe', 'suggestive'],
            hasAvailableChapters: true,
            createdAtSince: '2023-07-08T11:44:57',
          },
        });

        // Store the fetched data in component state
        setReducedPopularData(resp.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className='row col-lg-7 offset-lg-2 col-sm-1 col-md-12 col-12 my-4 bg-secondary rounded gx-3 justify-content-center'>
      <p className='fw-semibold ms-2 my-3 text-white'>Popular</p>
      <div className='row justify-content-center'>
        {reducedPopularData.map((popularManga, idx) => (
          <Popular
            key={popularManga.id}
            popularManga={popularManga}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularContainer;
