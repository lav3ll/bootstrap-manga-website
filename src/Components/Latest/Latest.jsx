import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Latest = ({ latestManga, idx, coverImg }) => {
  // State variables
  const mangaInfo = latestManga;
  const [hoverColour, setHoverColour] = useState('text-white');
  const [coverImages, setCoverImages] = useState('');

  useEffect(() => {
    // Fetch latest manga data
    const fetchLatest = async () => {
      try {
        // Find manga ID
        const mangaId = latestManga.relationships.find(
          (relationship) => relationship.type === 'manga'
        ).id;

        // Find file name of cover image
        const fileName = coverImg.relationships.find(
          (relationship) => relationship.type === 'cover_art'
        ).attributes.fileName;

        // Construct image source URL
        const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;

        // Set cover image state
        setCoverImages(src);
      } catch (error) {
        // Log error if fetching fails
        console.error('Error fetching manga data:', error);
      }
    };

    // Call fetchLatest function on component mount
    fetchLatest();
  }, [latestManga, coverImg]);

  // Event handlers for mouse hover
  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
  };

  // JSX for rendering Latest component
  return (
    <Link
      to={{ pathname: '/MangaInfo', state: mangaInfo }}
      className={`card row mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-5 col-lg-5 justify-content-cente text-decoration-none`}
      key={latestManga.id}
    >
      <div className='row w-100 py-3'>
        <img
          src={coverImages}
          alt={`thumbnail image of ${latestManga.attributes.title}`}
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
