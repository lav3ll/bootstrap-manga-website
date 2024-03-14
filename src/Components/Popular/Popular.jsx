import React, { useState, useEffect } from 'react';
import './Popular.css';

const Popular = ({ popularManga, idx }) => {
  // set hover color
  const [hoverColour, setHoverColour] = useState('text-white');
  // set overlay
  const [overlay, setOverlay] = useState(false);
  // set image source
  const [imageSrc, setImageSrc] = useState('');

  // Update image source once popularManga is available
  useEffect(() => {
    if (
      popularManga &&
      popularManga.relationships &&
      popularManga.relationships[2]
    ) {
      const fileName = popularManga.relationships[2].attributes.fileName;
      const src = `https://uploads.mangadex.org/covers/${popularManga.id}/${fileName}.256.jpg`;
      setImageSrc(src);
    }
  }, [popularManga]);

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
    setOverlay('popularImg-overlay');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
    setOverlay(false);
  };

  const handleClick = () => {
    // take clicked element data and make api call for manga summary page
    alert('test');
  };

  return (
    <div
      className={`card ${
        idx === 4 ? 'custom-hidden' : ''
      } custom-sm mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-2  col-lg-2`}
      key={popularManga.id}
      onClick={handleClick}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`thumbnail image of ${popularManga.title}`}
          className={`popularImg rounded ${overlay}`}
          style={{ height: '200px', objectFit: 'cover' }}
          onMouseOver={handleHoverOver}
          onMouseOut={handleHoverOut}
        />
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
