import React, { useEffect, useState } from 'react';
import Popular from './Popular';
import axios from 'axios';

function getMidnightTimestampOneMonthAgo() {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1); // Get date one month ago
  oneMonthAgo.setDate(now.getDate() - 1); // Subtract one day to get yesterday's date
  const year = oneMonthAgo.getFullYear();
  const month = (oneMonthAgo.getMonth() + 1).toString().padStart(2, '0');
  const day = oneMonthAgo.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00`;
}
const PopularContainer = () => {
  const [reducedPopularData, setReducedPopularData] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const baseUrl = 'http://localhost:5000/api/mangadex';

      try {
        const resp = await axios.get(`${baseUrl}/popular`);

        setReducedPopularData(resp.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className='row col-lg-10 offset-lg-1 col-sm-1 col-md-12 col-12 my-4 custom-secondary-bg-color rounded gx-3 justify-content-center'>
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
