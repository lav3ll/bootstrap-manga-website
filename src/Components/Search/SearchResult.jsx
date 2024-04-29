import React from 'react';
import './SearchResult.css';

const SearchResult = ({ sResult }) => {
  const title = sResult.attributes.title.en;
  const id = sResult.id;
  const fileName = sResult.relationships.find(
    (relationship) => relationship.type === 'cover_art'
  ).attributes.fileName;

  const src = `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`;
  return (
    <div className='col-12 row'>
      <img src={src} alt={`${title} thumbnail`} className='w-25 col-6' />
      <p className='col-6 search-fs'> {title}</p>
    </div>
  );
};

export default SearchResult;
