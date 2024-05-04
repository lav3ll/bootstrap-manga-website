import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './trending.css';
// import trendingTestData from '../../Data/popularTest.json';
const Trending = () => {
  // Initialize trendingManga state with useState
  const [trendingManga, setTrendingManga] = useState(null);
  const [coverImage, setCoverImage] = useState('');
  const [imageId, setImageId] = useState('');

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

        const fileName = resp.data.data.relationships.find(
          (relationship) => relationship.type === 'cover_art'
        ).attributes.fileName;
        const randomManga = resp.data.data.id;
        // Store the fetched data in component state
        setTrendingManga(resp.data.data);
        setCoverImage(
          `https://uploads.mangadex.org/covers/${randomManga}/${fileName}.256.jpg`
        );
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
              backgroundImage: `url(${coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '250px',
            }}
          >
            <p className='fw-semibold lg-fs-1 md-fw-4 md-fs-4 text-white d-flex align-items-center justify-content-center pt-5 md-px-2 lg-px-2 trending-week'>
              ELITE SCANS TRENDING THIS WEEK!
            </p>
            <p className='custom-primary pt-2 mt-2 px-4 fw-bold lg-fs-1 md-fw-4 md-fs-4'>
              {trendingManga.attributes.title.en}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Trending;
