import React from 'react';
import './SearchResult.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SearchResult = ({ sResult }) => {
  const [coverImage, setCoverImage] = useState('');
  useEffect(() => {
    setCoverImage(src);
  }, [sResult]);

  const title = sResult.attributes.title.en;
  const id = sResult.id;
  const fileName = sResult.relationships.find(
    (relationship) => relationship.type === 'cover_art'
  ).attributes.fileName;

  const src = `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`;
  return (
    <Link
      to={`/manga-info/${id}`}
      state={{ manga: { coverImg: coverImage, info: sResult } }}
      key={id}
    >
      <div className='col-12 row search-result'>
        <img src={src} alt={`${title} thumbnail`} className='w-25 col-2' />
        <p className='col-9 search-fs my-auto text-white'> {title}</p>
      </div>
    </Link>
  );
};

export default SearchResult;
