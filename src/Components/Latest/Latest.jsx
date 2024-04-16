import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Latest = ({ latestManga, coverImg, imageId, info }) => {
  // State variables to manage hover color and cover image source
  const [hoverColour, setHoverColour] = useState('text-white');
  const [coverImages, setCoverImages] = useState('');

  // Initialize title variable
  let title = '';

  // Extract manga title if imageId exists
  if (imageId) {
    title = title + imageId.attributes.title.en;
  }

  // Extract manga ID and file name of cover image
  const mangaId = latestManga.relationships.find(
    (relationship) => relationship.type === 'manga'
  ).id;

  // Fetch cover image source on component mount or when latestManga or coverImg changes
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        // Check if latestManga and coverImg are available
        if (!latestManga || !coverImg || !coverImg.relationships) return;

        const fileName = coverImg.relationships.find(
          (relationship) => relationship.type === 'cover_art'
        ).attributes.fileName;

        // Construct source URL for cover image
        const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
        setCoverImages(src);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchLatest();
  }, [latestManga, coverImg]);

  // Handle mouse hover over image
  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
  };

  // Handle mouse hover out from image
  const handleHoverOut = () => {
    setHoverColour('text-white');
  };

  return (
    // Link to MangaInfo page with manga cover image and info passed as state
    <Link
      to={`/manga-info/${mangaId}`}
      state={{ manga: { coverImg: coverImages, info: imageId } }}
      className={`card row mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-5 col-lg-5 justify-content-cente text-decoration-none`}
      key={latestManga.id}
    >
      <div className='row w-100 py-3'>
        {/* Display cover image */}
        <img
          src={coverImages}
          alt={`thumbnail image of ${title}`}
          className={`latestImg ms-3 col-5 rounded-4`}
          style={{ height: '150px', objectFit: 'cover' }}
          onMouseOver={handleHoverOver}
          onMouseOut={handleHoverOut}
        />
        {/* Display manga title and chapter number */}
        <div
          className={`latestTxt pt-2 fw-semibold ${hoverColour} row col-7`}
          onMouseOver={handleHoverOver}
          onMouseOut={handleHoverOut}
        >
          <p
            className='latest-title me-1'
            style={{ height: '60px', overflow: 'hidden' }}
          >
            {title}
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
