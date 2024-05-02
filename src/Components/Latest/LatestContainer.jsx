import React, { useEffect, useState } from 'react';
import Latest from './Latest';
import axios from 'axios';

const LatestContainer = () => {
  // State variables to store latest data, cover images, and image IDs
  const [latestData, setLatestData] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [imageId, setImageId] = useState([]);

  useEffect(() => {
    // Function to fetch the latest manga data
    const fetchLatest = async () => {
      const baseUrl = 'http://localhost:5000/api/mangadex';

      try {
        // Fetch latest manga chapters
        const resp = await axios.get(`${baseUrl}/latest`);

        if (resp && resp.data) {
          // Arrays to store unique manga IDs and filtered data
          const uniqueMangaIds = [];
          const filteredLatestData = resp.data.latestData;
          const filteredCoverImages = resp.data.coverImages;
          const filteredImageId = [];

          // Filter chapters to include only those with unique manga IDs
          filteredLatestData.forEach((chapter) => {
            const mangaId = chapter.relationships.find(
              (relationship) => relationship.type === 'manga'
            ).id;
            if (!uniqueMangaIds.includes(mangaId)) {
              uniqueMangaIds.push(mangaId);
            }
          });

          // Filter manga data to include only those corresponding to unique manga IDs
          const coverImages = filteredCoverImages.filter((manga) =>
            uniqueMangaIds.includes(manga.id)
          );

          coverImages.forEach((manga) => {
            filteredImageId.push(manga.id); // Assuming you need IDs separately
          });

          // Set the filtered data into state
          setLatestData(filteredLatestData);
          setCoverImages(coverImages);
          setImageId(filteredImageId);
        }
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    // Call the fetchLatest function
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
