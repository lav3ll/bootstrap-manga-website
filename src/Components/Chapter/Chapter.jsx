import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Chapter = () => {
  // Access the dynamic id parameter from the URL
  const { id } = useParams();
  const location = useLocation();
  const { chapterImg } = location.state || {};

  console.log(chapterImg);

  return <div>Chapter {id}</div>;
};

export default Chapter;
