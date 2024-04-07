import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineArrowRight } from 'react-icons/md';
import './MangaInfo.css';
import axios from 'axios';
import Chapters from './Chapters';

const MangaInfo = () => {
  const [chapters, setChapters] = useState([]);
  const location = useLocation();
  const { manga } = location.state;

  const saveBookmark = () => {
    alert('saved to local storage');
  };

  const genreSearch = () => {
    alert('search for genre');
  };

  useEffect(() => {
    const fetchChapter = async () => {
      const mangaID = manga.info.id;
      const languages = ['en'];
      const contentRatings = ['safe', 'suggestive', 'erotica'];
      const baseUrl = 'https://api.mangadex.org';

      const resp = await axios.get(`${baseUrl}/manga/${mangaID}/feed`, {
        params: {
          translatedLanguage: languages,
          order: {
            createdAt: 'asc',
            updatedAt: 'asc',
            publishAt: 'asc',
            readableAt: 'asc',
            volume: 'asc',
            chapter: 'asc',
          },
          contentRating: contentRatings,
          includeFutureUpdates: '1',
        },
      });
      setChapters(resp.data.data);
    };
    fetchChapter();
  }, []);

  return (
    <div className='manga-info-wrapper'>
      <div className='col-7 offset-1 manga-info-toplinks mt-4 mb-3 bg-secondary rounded px-2'>
        <Link
          to={{ pathname: '/' }}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          EliteScans
        </Link>{' '}
        <MdOutlineArrowRight />
        <Link
          to={{ pathname: `/manga-${manga.info.id}` }}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {manga.info.attributes.title.en}
        </Link>
      </div>
      <div className='row manga-info-container row col-7 offset-1'>
        <div className='col-5 bg-light rounded row text-center'>
          <img src={manga.coverImg} alt='test' />
          <button
            className='btn custom-bg-secondary mt-2 text-white fw-semibold'
            onClick={saveBookmark}
          >
            {' '}
            Bookmark
          </button>
          <p className='status my-1 fw-semibold bg-secondary rounded py-1'>
            {manga.info.attributes.status === ''
              ? 'Unknown'
              : manga.info.attributes.status}
          </p>
          <p className='type my-1 fw-semibold bg-secondary rounded py-1'>
            {manga.info.attributes.type
              ? manga.info.attributes.type
              : 'Unknown'}
          </p>
        </div>
        <div className='bg-dark rounded ms-4 col-7'>
          <div className='info-mid-topcol'>
            <h2 className='text-white mx-2 my-3'>
              {manga.info.attributes.title.en}
            </h2>
            <p className='text-white mx-2'>
              Synopsis {manga.info.attributes.title.en}
            </p>
            <p className='text-white mx-2'>
              {manga.info.attributes.description.en.slice(0, 282)}
            </p>
          </div>
          <div className='info-mid-botcol'>
            <p className='text-white ps-2 mb-0 pt-3'>Genres</p>
            {manga.info.attributes.tags.map((genre, index) => (
              <button
                key={index}
                className='btn text-white fs-6 px-1 bg-secondary mx-1 my-1 border-0'
                onClick={genreSearch}
              >
                {genre.attributes.name.en}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='chapter-list-container bg-secondary rounded col-7 offset-1 mt-4'>
        <div className='chapter-list-btns d-flex justify-content-around'>
          <div className='first-chapter col-5 btn custom-bg-secondary py-2 text-white mx-3 my-3'>
            <p className='my-0'>First Chapter</p>
            <p className='fw-semibold'>
              Chapter{' '}
              {chapters && chapters[0] ? chapters[0].attributes.chapter : null}
            </p>
          </div>
          <div className='last-chapter col-5 btn custom-bg-secondary py-2 text-white mx-3 my-3'>
            <p className='my-0'>Newest Chapter</p>
            <p className='fw-semibold'>
              Chapter{' '}
              {chapters && chapters[chapters.length - 1]
                ? chapters[chapters.length - 1].attributes.chapter
                : null}
            </p>
          </div>
        </div>
        <div className='chapter-list bg-secondary rounded mt-2 mx-5'>
          <div className='row'>
            {Array.isArray(chapters) &&
              chapters.map((chapter, index) => (
                <Chapters key={index} chapter={chapter} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaInfo;
