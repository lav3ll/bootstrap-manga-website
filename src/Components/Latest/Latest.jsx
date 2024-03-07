import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Latest = ({ latestManga, idx }) => {
  const mangaInfo = latestManga;
  const [hoverColour, setHoverColour] = useState('text-white');
  const [coverImg, setCoverImg] = useState('');

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const resp = await axios.get(
          `https://api.mangadex.org/cover?limit=10&manga[]=${latestManga.relationships[0].id}`
        );

        setCoverImg(
          `https://uploads.mangadex.org/covers/${latestManga.relationships[0].id}/${resp.data.data[0].attributes.fileName}.256.jpg`
        );

        // console.log(resp.data.data[0].id);
        // console.log(resp.data.data[0].attributes.fileName);
        console.log(resp.data.data);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };
    fetchLatest();
  }, []);

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
      key={latestManga.id}
    >
      <div className='row w-100'>
        <img
          src={coverImg}
          alt={`thumbnail image of ${latestManga.title}`}
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
            {latestManga.title}
          </p>
          <ul>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestManga.latest_chapter}
            </li>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestManga.latest_chapter}
            </li>
            <li className='popularChapNum text-gray pt-0'>
              Chapter {latestManga.latest_chapter}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Latest;
