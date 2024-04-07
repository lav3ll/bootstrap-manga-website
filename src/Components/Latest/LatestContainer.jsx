import React, { useEffect, useState } from 'react';
import Latest from './Latest';
import axios from 'axios';

const LatestContainer = () => {
  const [latestData, setLatestData] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [imageId, setImageId] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const baseUrl = 'https://api.mangadex.org';

      try {
        const resp = await axios.get(
          `${baseUrl}/chapter?includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&limit=20`
        );

        if (resp && resp.data && resp.data.data) {
          const uniqueMangaIds = [];
          const filteredLatestData = [];
          const filteredCoverImages = [];
          const filteredImageId = [];

          resp.data.data.forEach((chapter) => {
            const mangaId = chapter.relationships.find(
              (relationship) => relationship.type === 'manga'
            ).id;
            if (!uniqueMangaIds.includes(mangaId)) {
              uniqueMangaIds.push(mangaId);
              filteredLatestData.push(chapter);
            }
          });

          const mangaIdParams = uniqueMangaIds
            .map((id) => `ids%5B%5D=${id}`)
            .join('&');

          const resp2 = await axios.get(
            `${baseUrl}/manga?limit=64&includedTagsMode=AND&excludedTagsMode=OR&${mangaIdParams}&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true`
          );

          if (resp2 && resp2.data && resp2.data.data) {
            resp2.data.data.forEach((manga) => {
              const mangaId = manga.id;
              if (uniqueMangaIds.includes(mangaId)) {
                filteredCoverImages.push(manga);
                filteredImageId.push(manga);
              }
            });

            setLatestData(filteredLatestData);
            setCoverImages(filteredCoverImages);
            setImageId(filteredImageId);
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
              coverImg={coverImages[idx]} // Access corresponding cover image
              resp={latestData}
              resp2={null} // No need to use resp2
              imageId={imageId[idx]}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestContainer;
