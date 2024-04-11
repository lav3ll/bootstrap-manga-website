import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Chapter = () => {
  // Access the dynamic id parameter from the URL
  const { id } = useParams();
  const { state } = useLocation();
  const { chapterImages, chapters, index } = state || {};

  console.log(chapters);

  return (
    <>
      <div>Chapter {id}</div>
      <div className='chapter-img-container bg-secondary'>
        <div className='chapter-images row col-sm-12 col-md-8 col-lg-8 mx-auto'>
          {chapterImages?.chapter?.data?.map((image, idx) => (
            <img
              key={idx} // Add a unique key for each image
              src={`${chapterImages.baseUrl}/data/${chapterImages.chapter.hash}/${image}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chapter;
