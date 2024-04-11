import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Chapter = () => {
  // Access the dynamic id parameter from the URL
  const { id } = useParams();
  const { state } = useLocation();
  const { chapterImages, chapters, index } = state || {};

  //   console.log(chapters);

  return (
    <>
      <div>Chapter {id}</div>
      <div className='chapter-links row col-8 bg-primary mx-auto'>
        <div className='chapter-select col-3 bg-secondary'>test</div>
        <div className='chapter-next-prev row col-5 ms-auto'>
          <div className='btn btn-primary chapter-prev col-6 text-end'>
            Prev
          </div>
          <div className='btn btn-primary chapter-next col-6 text-start'>
            Next
          </div>
        </div>
      </div>

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
