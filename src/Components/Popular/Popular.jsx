import React, { useState } from 'react';
import './Popular.css';

const Popular = ({ popularManga }) => {
  console.log(popularManga);
  // set hover color
  const [hoverColour, setHoverColour] = useState('text-white');

  // set overlay
  const [overlay, setOverlay] = useState(false);

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
    setOverlay('popularImg-overlay');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
    setOverlay(false);
  };
  return (
    <div
      className='card col-2 mx-2 px-0 bg-transparent border-0 popular-card-container'
      key={popularManga.id}
    >
      <img
        src={popularManga.thumbnail_url}
        alt={`thumbnail image of ${popularManga.title}`}
        className={`popularImg ${overlay}`}
        style={{ height: '200px', objectFit: 'cover' }}
        onMouseOver={handleHoverOver}
        onMouseOut={handleHoverOut}
      />
      <div
        className={`popularTxt pt-2 fw-semibold ${hoverColour} `}
        onMouseOver={handleHoverOver}
        onMouseOut={handleHoverOut}
      >
        <p
          className='popular-title'
          style={{ height: '60px', overflow: 'hidden' }}
        >
          {popularManga.title.slice(0, 40)}
        </p>
        <p className='popularChapNum text-gray pt-0 '>
          Chapter {popularManga.latest_chapter}
        </p>
      </div>
    </div>
  );
};

export default Popular;
