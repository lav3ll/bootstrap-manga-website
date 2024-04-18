import React, { useEffect, useState } from 'react';
import './StaffPicks.css';

const Pick = ({ staffManga, index }) => {
  const [coverImage, setCoverImage] = useState('');
  const [showGenres, setShowGenres] = useState([]);

  useEffect(() => {
    const mangaId = staffManga.id;
    const coverArtRelationship = staffManga.relationships.find(
      (relationship) => relationship.type === 'cover_art'
    );
    const fileName = coverArtRelationship?.attributes.fileName;
    const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
    setCoverImage(src);

    const genreTags = staffManga.attributes.tags.filter(
      (tag) => tag.attributes.group === 'genre'
    );
    const genres = genreTags.slice(0, 5);
    setShowGenres(genres);
  }, [staffManga]);

  return (
    <div className='card my-2'>
      <div className='card-body row'>
        <p className='col-2 my-auto border border-3 rounded-1 fw-semibold px-0 mx-2 text-center pick-custom-width'>
          {index + 1}
        </p>
        <img
          className='card-img-top  col-4 px-0'
          src={coverImage}
          alt={`Cover art for ${staffManga.attributes.title.en}`}
        />
        <div className='card-text col-6'>
          <p>{staffManga.attributes.description.en.slice(0, 50) + '...'}</p>
          <p>
            Genres:
            {showGenres.map((genre, idx) => (
              <span key={idx}>{genre.attributes.name.en}, </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pick;
