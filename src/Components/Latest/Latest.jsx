import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Latest = ({ latestManga, coverImg, imageId }) => {
  const [hoverColour, setHoverColour] = useState('text-white');
  const [coverImages, setCoverImages] = useState('');

  let title = '';

  if (imageId) {
    title = title + imageId.attributes.title.en;
  }

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        if (!latestManga || !coverImg || !coverImg.relationships) return;

        const mangaId = latestManga.relationships.find(
          (relationship) => relationship.type === 'manga'
        ).id;

        const fileName = coverImg.relationships.find(
          (relationship) => relationship.type === 'cover_art'
        ).attributes.fileName;

        const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
        setCoverImages(src);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchLatest();
  }, [latestManga, coverImg]);

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
  };

  return (
    <Link
      to='/MangaInfo'
      state={{ manga: [coverImages] }}
      className={`card row mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-5 col-lg-5 justify-content-cente text-decoration-none`}
      key={latestManga.id}
    >
      Next Step
      <div className='row w-100 py-3'>
        <img
          src={coverImages}
          alt={`thumbnail image of ${title}`}
          className={`latestImg ms-3 col-5 rounded-4`}
          style={{ height: '150px', objectFit: 'cover' }}
          onMouseOver={handleHoverOver}
          onMouseOut={handleHoverOut}
        />
        <div
          className={`latestTxt pt-2 fw-semibold ${hoverColour} row col-7`}
          onMouseOver={handleHoverOver}
          onMouseOut={handleHoverOut}
        >
          <p
            className='latest-title me-1'
            style={{ height: '60px', overflow: 'hidden' }}
          >
            {latestManga.attributes.title}
          </p>
          <ul>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestManga.attributes.chapter}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Latest;
