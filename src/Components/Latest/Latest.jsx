import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Latest = ({ latestData, idx }) => {
  const mangaInfo = latestData;
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

    <NavLink
      to='/Login'
      className='btn btn-outline-dark btn-lg rounded-5 active'
    ></NavLink>;
  };

  return (
    <Link
      to={{ pathname: '/MangaInfo', state: mangaInfo }}
      className={`card row mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-5 col-lg-5 justify-content-cente text-decoration-none`}
      key={latestData.id}
    >
      <div className='row w-100'>
        <img
          src={latestData.thumbnail_url}
          alt={`thumbnail image of ${latestData.title}`}
          className={`latestImg ${overlay} ms-3 col-5 rounded`}
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
            {latestData.title.slice(0, 40)}
          </p>
          <ul>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestData.latest_chapter}
            </li>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestData.latest_chapter}
            </li>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestData.latest_chapter}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Latest;
