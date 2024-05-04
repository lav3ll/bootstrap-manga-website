import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Latest = ({ latestManga, coverImg, imageId }) => {
  const [hoverColour, setHoverColour] = useState('text-white');
  const [coverImages, setCoverImages] = useState('');
  const [overlay, setOverlay] = useState(false);

  // Extract manga title safely
  let title =
    (imageId &&
      imageId.attributes &&
      imageId.attributes.title &&
      imageId.attributes.title.en) ||
    'No Title';

  // Safely extract manga ID and file name of cover image
  const mangaId =
    (latestManga &&
      latestManga.relationships.find(
        (relationship) => relationship.type === 'manga'
      )?.id) ||
    '';

  const fileName =
    (imageId &&
      imageId.relationships.find(
        (relationship) => relationship.type === 'cover_art'
      )?.attributes.fileName) ||
    '';

  if (mangaId) {
    useEffect(() => {
      // Construct source URL for cover image
      const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
      console.log(src, `id: ${mangaId}`, `fileName: ${fileName}`);

      setCoverImages(src);
    }, [mangaId, fileName]);
  } else {
    console.log('src not available');
  }

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
    setOverlay('img-overlay');
  };
  const handleHoverOut = () => {
    setHoverColour('text-white');
    setOverlay(false);
  };

  return (
    <Link
      to={`/manga-info/${mangaId}`}
      state={{ manga: { coverImg: coverImages, info: imageId } }}
      className={`card row mx-lg-2 px-lg-0 mx-md-2 px-md-0 mx-sm-0 px-sm-0 bg-transparent border-0 popular-card-container col-md-5 col-lg-5 justify-content-center text-decoration-none`}
      key={latestManga.id}
    >
      <div className='row w-100 py-3'>
        <img
          src={coverImages}
          alt={`thumbnail image of ${title}`}
          className={`latestImg ms-3 col-5 rounded-4 ${overlay}`}
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
