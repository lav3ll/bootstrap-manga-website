import React, { useEffect, useState } from 'react';
import Latest from './Latest';
import axios from 'axios';

const LatestContainer = () => {
  const [latestData, setLatestData] = useState(null);
  const [coverImages, setCoverImages] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const baseUrl = 'https://api.mangadex.org';

      try {
        const resp = await axios.get(
          `${baseUrl}/chapter?includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&limit=20`
        );

        if (resp && resp.data && resp.data.data) {
          const mangaIds = resp.data.data.map(
            (chapter) => chapter.relationships[1].id
          );
          const mangaIdParams = mangaIds
            .map((id) => `manga%5B%5D=${id}`)
            .join('&');
          const resp2 = await axios.get(
            `${baseUrl}/cover?limit=20&${mangaIdParams}&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc&includes%5B%5D=manga`
          );

          if (resp2 && resp2.data && resp2.data.data) {
            setLatestData(resp.data.data);
            setCoverImages(resp2.data.data);
          }
        }
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
          coverImages &&
          latestData.map((latestManga, idx) => (
            <Latest
              key={latestManga.id}
              latestManga={latestManga}
              idx={idx}
              coverImage={coverImages[idx]} // Access corresponding cover image
              resp={latestData}
              resp2={coverImages}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestContainer;
