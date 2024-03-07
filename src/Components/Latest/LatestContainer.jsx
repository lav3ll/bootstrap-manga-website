import { React, useEffect, useState } from 'react';
import Latest from './Latest';
import axios from 'axios';

const LatestContainer = () => {
  const [latestData, setLatestData] = useState(null);
  // console.log(latestData);

  useEffect(() => {
    const fetchLatest = async () => {
      const baseUrl = 'https://api.mangadex.org';

      try {
        const resp = await axios.get(
          `https://api.mangadex.org/chapter?includes[]=scanlation_group&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&limit=20`
        );

        // Store the fetched data in component state
        // setLatestData(resp.data.data);
        // console.log(resp.data.data);
        setLatestData(resp.data.data);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className='row col-lg-7 offset-lg-2 col-sm-1 col-md-12 col-12 my-4 bg-secondary rounded gx-3 w-sm-100 justify-content-center'>
      <p className='fw-semibold ms-2 my-3 text-white'>Latest</p>
      <div className='row'>
        {latestData &&
          latestData.map((latestManga, idx) => (
            <Latest key={latestManga.id} latestManga={latestManga} idx={idx} />
          ))}
      </div>
    </div>
  );
};

export default LatestContainer;
