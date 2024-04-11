import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Chapter = () => {
  // Access the dynamic id parameter from the URL
  const { id } = useParams();
  const location = useLocation();
  const { chapterImg } = location.state || {};

  // setChapterImages(resp.data.data);
  // https://cmdxd98sb0x3yprd.mangadex.network/
  // data OR data-saver /
  // hash /
  // 1-a7a414491dfd94d5031e1cbce0b11eb992f0df59ce111f1799f1024af460984c.jpg

  //   console.log(
  //     `${chapterImg.baseUrl}/data/${chapterImg.chapter.hash}/${chapterImg.chapter.data[0]}`
  //   );

  return (
    <>
      <div>Chapter {id}</div>
      <div className='chapter-img-container bg-secondary'>
        <div className='chapter-images row col-8 mx-auto'>
          {chapterImg &&
            chapterImg.chapter.data.map((image, idx) => (
              <img
                key={idx} // Add a unique key for each image
                src={`${chapterImg.baseUrl}/data/${chapterImg.chapter.hash}/${image}`}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Chapter;
