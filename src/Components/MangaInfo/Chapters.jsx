import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chapters = ({ chapter, chapters, idx, manga }) => {
  const [hoverColour, setHoverColour] = useState('text-white');
  const [chapterImages, setChapterImages] = useState(null);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(chapter.attributes.createdAt).toLocaleDateString(
    'en-US',
    options
  );
  const navigate = useNavigate();

  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
  };

  const handleHoverOut = () => {
    setHoverColour('text-white');
  };
  const handleClick = () => {
    axios
      .get(`http://localhost:5000/api/chapter/${chapter.id}`)
      .then((resp) => {
        setChapterImages(resp.data);
        navigate(`/chapter/${chapter.id}`, {
          state: {
            chapterImages: resp.data,
            chapters: chapters,
            manga: manga,
            index: idx,
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching chapter:', error);
      });
  };

  return (
    <Link
      to={`/chapter/${chapter.id}`}
      state={{
        chapterImages: chapterImages,
        chapters: chapters,
        manga: manga,
        index: idx,
      }}
      onClick={handleClick}
    >
      <div
        className={`chapter btn w-100 text-center py-2 rounded custom-outline px-4 my-2 ${hoverColour}`}
        onMouseOver={handleHoverOver}
        onMouseOut={handleHoverOut}
      >
        <p className='fw-semibold'>{`Chapter ${chapter.attributes.chapter}`}</p>
        <p className='py-0 my-0'>{date}</p>
      </div>
    </Link>
  );
};

export default Chapters;
