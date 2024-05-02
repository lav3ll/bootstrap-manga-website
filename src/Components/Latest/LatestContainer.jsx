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
      const baseUrl = 'https://api.mangadex.org';

      try {
        // Fetch latest manga chapters
        const resp = await axios.get(
          `${baseUrl}/chapter?includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&limit=20`
        );

        if (resp && resp.data && resp.data.data) {
          // Arrays to store unique manga IDs and filtered data
          const uniqueMangaIds = [];
          const filteredLatestData = [];
          const filteredCoverImages = [];
          const filteredImageId = [];

          // Filter chapters to include only those with unique manga IDs
          resp.data.data.forEach((chapter) => {
            const mangaId = chapter.relationships.find(
              (relationship) => relationship.type === 'manga'
            ).id;
            if (!uniqueMangaIds.includes(mangaId)) {
              uniqueMangaIds.push(mangaId);
              filteredLatestData.push(chapter);
            }
          });

          // Prepare parameters for the next request based on unique manga IDs
          const mangaIdParams = uniqueMangaIds
            .map((id) => `ids%5B%5D=${id}`)
            .join('&');

          // Fetch manga data based on unique manga IDs
          const resp2 = await axios.get(
            `${baseUrl}/manga?limit=64&includedTagsMode=AND&excludedTagsMode=OR&${mangaIdParams}&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true`
          );

          if (resp2 && resp2.data && resp2.data.data) {
            // Filter manga data to include only those corresponding to unique manga IDs
            resp2.data.data.forEach((manga) => {
              const mangaId = manga.id;
              if (uniqueMangaIds.includes(mangaId)) {
                filteredCoverImages.push(manga);
                filteredImageId.push(manga);
              }
            });

            // Set the filtered data into state
            setLatestData(filteredLatestData);
            setCoverImages(filteredCoverImages);
            setImageId(filteredImageId);
          }
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
