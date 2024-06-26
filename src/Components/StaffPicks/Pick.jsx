import React, { useEffect, useState } from 'react';
import './StaffPicks.css';
import { Link } from 'react-router-dom';

const Pick = ({ staffManga, index }) => {
  const [coverImage, setCoverImage] = useState('');
  const [showGenres, setShowGenres] = useState([]);
  const [imageId, setImageId] = useState(staffManga);
  const [hoverColour, setHoverColour] = useState('text-white');
  const [overlay, setOverlay] = useState(false);
  const [borderColor, setBorderColor] = useState('border-light');

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
    setOverlay('img-overlay');
    setBorderColor('border-custom');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
    setOverlay(false);
    setBorderColor(false);
  };

  const handleClick = (e) => {
    if (e.currentTarget.className === 'staff-genre') {
      console.log('test1');
    } else if (e.target.tagName === 'IMG') {
      console.log('test2');
    }
  };
  useEffect(() => {
    const mangaId = staffManga.id;
    const coverArtRelationship = staffManga.relationships.find(
      (relationship) => relationship.type === 'cover_art'
    );
    const fileName = coverArtRelationship?.attributes.fileName;
    const src = `https://elitescans-data-a61945b29883.herokuapp.com/api/mangadex/cover/${mangaId}/${fileName}`;
    setCoverImage(src);

    const genreTags = staffManga.attributes.tags.filter(
      (tag) => tag.attributes.group === 'genre'
    );
    const genres = genreTags.slice(0, 5);
    setShowGenres(genres);
  }, [staffManga]);

  return (
    <div className='card my-2 custom-secondary-bg-color border-0 staff-pick-container'>
      <div className='card-body row card-custom-border py-2 pb-0 mx-0'>
        <p
          className={`col-2 my-auto border border-3 ${borderColor} rounded-1 fw-semibold  px-1 mx-2 text-center pick-custom-width`}
        >
          {index + 1}
        </p>
        <Link
          to={`/manga-info/${staffManga.id}`}
          state={{ manga: { coverImg: coverImage, info: imageId } }}
          key={staffManga.id}
          className='col-4 px-0'
        >
          <img
            className={`card-img-top ${overlay}`}
            src={coverImage}
            alt={`Cover art for ${staffManga.attributes.title.en}`}
            onClick={handleClick}
            onMouseOver={handleHoverOver}
            onMouseOut={handleHoverOut}
          />
        </Link>
        <div
          className={`card-text col-6 fs-0 fw-semibold ${hoverColour}`}
          onMouseOver={handleHoverOver}
          onMouseOut={handleHoverOut}
        >
          <p>{staffManga.attributes.description.en.slice(0, 50) + '...'}</p>
          <p>
            Genres :
            {showGenres.map((genre, idx) => (
              <span className='staff-genre' key={idx} onClick={handleClick}>
                {genre.attributes.name.en},{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pick;
