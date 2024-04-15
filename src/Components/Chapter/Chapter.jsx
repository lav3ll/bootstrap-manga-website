import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Chapter = () => {
  const [chapterImagesNew, setChapterImagesNew] = useState(null);

  const { id } = useParams();
  const { state } = useLocation();
  const { chapters, index, manga } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    getChapter();
  }, [id, index]);

  const handlePrevClick = () => {
    if (index > 0) {
      navigate(`/chapter/${chapters[index - 1].id}`, {
        state: {
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
          chapters: chapters,
          manga: manga,
          index: index + 1,
        },
      });
    } else {
      alert('There is no next chapter');
    }
  };

  const getChapter = () => {
    axios
      .get(`https://api.mangadex.org/at-home/server/${id}`)
      .then((resp) => {
        setChapterImagesNew(resp.data);
      })
      .catch((error) => {
        console.error('Error fetching chapter:', error);
      });
  };

  const chapterLinks = (
    <div className='chapter-links row col-8 mx-auto my-3'>
      <select
        id='chapter-select'
        name='chapter-select'
        className='chapter-select col-sm-12 col-md-12 col-lg-3 bg-dark text-white rounded-5'
        value={chapters[index].attributes.chapter}
        onChange={(e) => {
          const selectedIndex = chapters.findIndex(
            (chapter) => chapter.attributes.chapter === e.target.value
          );
          navigate(`/chapter/${chapters[selectedIndex].id}`, {
            state: {
              chapters: chapters,
              manga: manga,
              index: selectedIndex,
            },
          });
        }}
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
  );

  return (
    <div className='bg-secondary row'>
      <div className='bg-dark'>
        <h6 className='text-white col-9 mx-auto text-center mt-2'>
          All chapters in{' '}
          <Link
            to={`/MangaInfo`}
            state={{
              manga: manga,
            }}
          >
            <span className='fw-semibold custom-text-secondary'>
              {manga.info.attributes.title.en}
            </span>
          </Link>
        </h6>
      </div>
      {chapterLinks}

      <div className='chapter-img-container bg-secondary'>
        <div className='chapter-images row col-sm-12 col-md-8 col-lg-8 mx-auto'>
          {chapterImagesNew?.chapter?.data?.map((image, idx) => (
            <img
              key={idx}
              src={`${chapterImagesNew.baseUrl}/data/${chapterImagesNew.chapter.hash}/${image}`}
            />
          ))}
        </div>
      </div>
      {chapterLinks}
    </div>
  );
};

export default Chapter;
