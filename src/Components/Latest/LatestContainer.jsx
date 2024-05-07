import React, { useEffect, useState } from 'react';
import Latest from './Latest';
import axios from 'axios';

const LatestContainer = () => {
  // State variables to store latest data, cover images, and image IDs
  const [latestData, setLatestData] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [imageId, setImageId] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const baseUrl =
        'https://elitescans-data-a61945b29883.herokuapp.com/api/mangadex';

      try {
        const resp = await axios.get(`${baseUrl}/latest`);
        if (resp && resp.data) {
          // Use Set to ensure all manga IDs are unique
          const uniqueMangaIds = new Set();

          // Extract IDs from the latest data
          const filteredLatestData = resp.data.latestData.filter((chapter) => {
            const mangaId = chapter.relationships.find(
              (relationship) => relationship.type === 'manga'
            )?.id;
            if (mangaId && !uniqueMangaIds.has(mangaId)) {
              uniqueMangaIds.add(mangaId);
              return true; // Keep this chapter as it's associated with a unique mangaId
            }
            return false; // Exclude this chapter
          });

          // Filter cover images based on unique manga IDs
          const filteredCoverImages = resp.data.coverImages.filter((manga) =>
            uniqueMangaIds.has(manga.id)
          );

          // Set the filtered data into state
          setLatestData(filteredLatestData.slice(0, 10));
          console.log(filteredLatestData);
          setCoverImages(filteredCoverImages);
          setImageId(filteredCoverImages); // Assuming each cover image correlates to an imageId
        }
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchLatest();
  }, []);
  return (
    // Render the latest manga container
    <div className='row col-lg-10 offset-lg-1 col-sm-1 col-md-12 col-12 my-4 custom-secondary-bg-color rounded gx-3 w-sm-100 justify-content-center'>
      <p className='fw-semibold ms-2 my-3 text-white'>Latest</p>
      <div className='row'>
        {/* Render Latest component for each manga */}
        {latestData &&
          coverImages &&
          latestData.map((latestManga, idx) => (
            <Latest
              key={latestManga.id}
              latestManga={latestManga}
              idx={idx}
              coverImg={coverImages[idx]}
              resp={latestData}
              imageId={imageId[idx]}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestContainer;
