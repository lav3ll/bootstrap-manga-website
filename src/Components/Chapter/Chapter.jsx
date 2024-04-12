import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Chapter = () => {
  const [chapterImagesNew, setChapterImagesNew] = useState(null);
  // Access the dynamic id parameter from the URL
  const { id } = useParams();
  const { state } = useLocation();
  const { chapterImages, chapters, index, manga } = state || {};
  const navigate = useNavigate();

  console.log(manga);

  const handlePrevClick = () => {
    if (index > 0) {
      navigate(`/chapter/${chapters[index - 1].id}`, {
        state: {
          chapterImages: chapterImagesNew,
          chapters: chapters,
          manga: manga,
          index: index - 1,
        },
      });
    } else {
      alert('There is no previous chapter');
    }
  };

  const handleNextClick = () => {
    if (index < chapters.length - 1) {
      navigate(`/chapter/${chapters[index + 1].id}`, {
        state: {
          chapterImages: chapterImagesNew,
          chapters: chapters,
          manga: manga,
          index: index + 1,
        },
      });
    } else {
      alert('There is no next chapter');
    }
  };

  const getChapter = (addOrSub) => {
    axios
    .get(`https://api.mangadex.org/at-home/server/${id}`)
    .then((resp) => {
      setChapterImagesNew((prevState) => resp.data);
      navigate(`/chapter/${id}`, {
        state: {
          chapterImages: resp.data,
          chapters: chapters,
          manga: manga,
          index: `index ${addOrSub}`
        },
      });
    })

    .catch((error) => {
      console.error('Error fetching chapter:', error);
    });
};

  };
  return (
    <div className='bg-dark row'>
      <h6 className='text-white col-9 mx-auto text-center mt-2'>
        All chapters in {manga.info.attributes.title.en}
      </h6>
      <div className='chapter-links row col-8 bg-dark mx-auto my-3'>
        <select
          id='chapter-select'
          name='chapter-select'
          className='chapter-select col-sm-12 col-md-12 col-lg-3 bg-secondary rounded-5'
          value={chapters[index].attributes.chapter}
        >
          {chapters.map((chapter, idx) => (
            <option key={idx} value={chapter.attributes.chapter}>
              Chapter {chapter.attributes.chapter}
            </option>
          ))}
        </select>

        <div className='chapter-next-prev row col-5 ms-auto'>
          <div
            className='btn btn-primary chapter-prev col-5 rounded-5 custom-bg-secondary text-centre'
            onClick={handlePrevClick}
          >
            Prev
          </div>
          <div
            className='btn btn-primary chapter-next col-5 text-centre rounded-5 custom-bg-secondary'
            onClick={handleNextClick}
          >
            Next
          </div>
        </div>
      </div>

      <div className='chapter-img-container bg-secondary'>
        <div className='chapter-images row col-sm-12 col-md-8 col-lg-8 mx-auto'>
          {chapterImages?.chapter?.data?.map((image, idx) => (
            <img
              key={idx}
              src={`${chapterImages.baseUrl}/data/${chapterImages.chapter.hash}/${image}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
