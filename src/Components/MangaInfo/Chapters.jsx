import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chapters = ({ chapter }) => {
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
      .get(`https://api.mangadex.org/at-home/server/${chapter.id}`)
      .then((resp) => {
        setChapterImages((prevState) => resp.data);

        navigate(`/chapter/${chapter.id}`, {
          state: { chapterImg: resp.data },
        });
      })
      .catch((error) => {
        console.error('Error fetching chapter:', error);
      });
  };

  return (
    <Link
      to={`/chapter/${chapter.id}`}
      state={{ chapterImg: chapterImages }}
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
