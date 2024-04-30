import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineArrowRight } from 'react-icons/md';
import './MangaInfo.css';
import axios from 'axios';
import Chapters from './Chapters';
import StaffPicks from '../StaffPicks/StaffPicks';

const MangaInfo = () => {
  const [chapters, setChapters] = useState([]);
  const [chapterImages, setChapterImages] = useState(null);
  const [firstLast, setFirstLast] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleClick = (e) => {
    if (chapters.length > 0) {
      const isFirstChap =
        e.currentTarget.getAttribute('data-type') == 'firstChap';
      const indexToFetch = isFirstChap ? 0 : chapters.length - 1;
      axios
        .get(
          `https://api.mangadex.org/at-home/server/${chapters[indexToFetch].id}`
        )
        .then((resp) => {
          setChapterImages((prevState) => resp.data);
          navigate(`/chapter/${chapters[indexToFetch].id}`, {
            state: {
              chapterImages: resp.data,
              chapters: chapters,
              manga: manga,
              index: indexToFetch,
            },
          });
        })
        .catch((error) => {
          console.error('Error fetching chapter:', error);
        });
    }
  };
  console.log(manga);
  return (
    <>
      <div className='manga-info-wrapper row'>
        <div className='col-lg-7 offset-lg-1 col-md-12 offset-md-0  manga-info-toplinks mt-4 mb-3 bg-secondary rounded px-2 goooooooooop'>
          <Link
            to={{ pathname: '/' }}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            EliteScans
          </Link>
          <MdOutlineArrowRight />
          <Link
            to={{ pathname: `/manga-${manga.info.id}` }}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            {manga.info.attributes.title.en}
          </Link>
        </div>
        <div className='div col-1 custom-hide'>
          <StaffPicks />
        </div>
        <div className='row manga-info-container row col-lg-7 offset-lg-1 col-md-12 offset-md-0 col-sm-12'>
          <div className='col-lg-5 col-md-5 col-6 mx-auto mx-sm-0 mx-md-0 mx-lg-0 bg-light rounded row text-center'>
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
          <div className='bg-secondary rounded ms-4 col-lg-7 col-md-7 col-sm-6 ms-auto'>
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
                  className='btn text-white fs-6 px-1 bg-dark mx-1 my-1 border-0'
                  onClick={genreSearch}
                >
                  {genre.attributes.name.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='chapter-list-container bg-secondary rounded col-lg-7 offset-lg-1 col-md-12 offset-md-0 mt-4 '>
        <h6 className='text-white fs-5 ms-2 pt-2 mb-0'>
          Chapter {manga.info.attributes.title.en}{' '}
        </h6>
        <div className='chapter-list-btns d-flex justify-content-around '>
          <div
            className='first-chapter col-5 btn custom-bg-secondary py-2 text-white mx-3 my-3'
            onClick={handleClick}
            data-type={'firstChap'}
            // datatype={firstChap}
          >
            <p className='my-0 pt'>First Chapter</p>
            <p className='fw-semibold'>
              Chapter{' '}
              {chapters && chapters[0] ? chapters[0].attributes.chapter : null}
            </p>
          </div>
          <div
            className='last-chapter col-5 btn custom-bg-secondary py-2 text-white mx-3 my-3'
            onClick={handleClick}
            datatype={'lastChap'}
          >
            <p className='my-0'>New Chapter</p>
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
                <Chapters
                  key={index}
                  chapter={chapter}
                  chapters={chapters}
                  manga={manga}
                  idx={index}
                />
              ))}
          </div>
        </div>
      </div>
      <div className='div col-1 d-md-none'>
        <StaffPicks />
      </div>
    </>
  );
};

export default MangaInfo;
