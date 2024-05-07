import React from 'react';
import './SearchResult.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SearchResult = ({ sResult, onClose }) => {
  const [coverImage, setCoverImage] = useState('');

  const handleClick = () => {
    onClose();
  };

  useEffect(() => {
    setCoverImage(src);
  }, [sResult]);

  const title = sResult.attributes.title.en;
  const mangaId = sResult.id;
  const fileName = sResult.relationships.find(
    (relationship) => relationship.type === 'cover_art'
  ).attributes.fileName;

  const src = `https://elitescans-data-a61945b29883.herokuapp.com/api/mangadex/cover/${mangaId}/${fileName}`;
  return (
    <Link
      to={`/manga-info/${id}`}
      state={{ manga: { coverImg: coverImage, info: sResult } }}
      key={id}
      onClick={handleClick} // Call handleClick when the search result is clicked
    >
      <div
        className='col-12 row search-result py-2 ps-1
       '
      >
        <img
          src={src}
          alt={`${title} thumbnail`}
          className='w-25 col-2 search-img'
        />
        <p className='col-9 search-fs my-auto text-white '> {title}</p>
      </div>
    </Link>
  );
};

export default SearchResult;
