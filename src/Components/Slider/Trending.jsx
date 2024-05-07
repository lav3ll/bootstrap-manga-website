import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Trending = () => {
  // Initialize trendingManga state with useState
  const [trendingManga, setTrendingManga] = useState(null);
  const [coverImage, setCoverImage] = useState('');
  const [imageId, setImageId] = useState('');

  useEffect(() => {
    const fetchTrending = async () => {
      const baseUrl =
        'https://elitescans-data-a61945b29883.herokuapp.com/api/mangadex';
      try {
        const response = await axios.get(`${baseUrl}/random`);
        setTrendingManga(response.data.manga);
        setCoverImage(response.data.coverImageUrl);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className='text-center trending d-none d-sm-none md-d-none d-lg-block'>
      {/* Conditionally render the JSX content */}
      {trendingManga && (
        <Link
          to={`/manga-info/${trendingManga.id}`}
          state={{ manga: { coverImg: coverImage, info: trendingManga } }}
          key={trendingManga.id}
          className='col-4 px-0 trending-link'
        >
          <div
            className='mx-2 rounded'
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${coverImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '250px',
            }}
          >
            <p className='px-2 fw-semibold lg-fs-1 md-fw-4 md-fs-4 text-white d-flex align-items-center justify-content-center pt-5 md-px-2 lg-px-2 trending-week'>
              ELITE SCANS TRENDING THIS WEEK!
            </p>
            <p className='text-white pt-2 mt-2 px-4 fw-bold lg-fs-1 md-fw-4 md-fs-4'>
              {trendingManga.attributes.title.en}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Trending;
