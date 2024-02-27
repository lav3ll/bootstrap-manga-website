import React, { useState } from 'react';

const Latest = ({ latestManga, idx }) => {
  // console.log(popularManga);
  // console.log(idx);
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

  const handleClick = () => {
    // take clicked element data and make api call for manga summary page
    alert('test');
  };

  return (
    <div
      className={`card row ${
        idx === 4 ? 'custom-hidden' : ''
      } custom-sm mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-5 col-lg-5`}
      key={latestManga.id}
      onClick={handleClick}
    >
      <div className='row w-100'>
        <img
          src={latestManga.thumbnail_url}
          alt={`thumbnail image of ${latestManga.title}`}
          className={`latestImg rounded ${overlay} ms-3 col-5`}
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
            {latestManga.title.slice(0, 40)}
          </p>
          <ul>
            <li className='popularChapNum text-gray pt-0 '>
              Chapter {latestManga.latest_chapter}
            </li>
            <li className='popularChapNum text-gray pt-0 '>
              Chapter {latestManga.latest_chapter}
            </li>
            <li className='popularChapNum text-gray pt-0 '>
              Chapter {latestManga.latest_chapter}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Latest;
