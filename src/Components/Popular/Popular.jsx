import React, { useState, useEffect } from 'react';
import './Popular.css';
import { Link } from 'react-router-dom';

const Popular = ({ popularManga, idx }) => {
  const [hoverColour, setHoverColour] = useState('text-white');
  const [overlay, setOverlay] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (popularManga && popularManga.relationships) {
      const coverArt = popularManga.relationships.find(
        (relationship) => relationship.type === 'cover_art'
      );
      if (coverArt && coverArt.attributes && coverArt.attributes.fileName) {
        const fileName = coverArt.attributes.fileName;
        const src = `https://uploads.mangadex.org/covers/${popularManga.id}/${fileName}.256.jpg`;
        setImageSrc(src);
      }
    }
  }, [popularManga]);

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
    setOverlay('img-overlay');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
    setOverlay(false);
  };

  return (
    <div
      className={`card ${
        idx === 4 ? 'custom-hidden' : ''
      } mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-2 col-lg-2 col-4`}
    >
      {imageSrc ? (
        <Link
          to={`/manga-info/${popularManga.id}`}
          state={{ manga: { coverImg: imageSrc, info: popularManga } }}
        >
          <img
            src={imageSrc}
            alt={`thumbnail image of ${
              popularManga.attributes
                ? popularManga.attributes.title.en
                : 'Loading...'
            }`}
            className={`popularImg rounded ${overlay}`}
            style={{ height: '200px', objectFit: 'cover' }}
            onMouseOver={handleHoverOver}
            onMouseOut={handleHoverOut}
          />
        </Link>
      ) : (
        <div>Loading...</div>
      )}
      <div
        className={`popularTxt pt-2 fw-semibold ${hoverColour} `}
        onMouseOver={handleHoverOver}
        onMouseOut={handleHoverOut}
      >
        <p
          className='popular-title'
          style={{ height: '60px', overflow: 'hidden' }}
        >
          {popularManga && popularManga.attributes
            ? popularManga.attributes.title.en
            : 'Loading...'}
        </p>
      </div>
    </div>
  );
};

export default Popular;
