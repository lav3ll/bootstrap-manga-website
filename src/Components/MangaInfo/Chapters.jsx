import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Chapters = ({ chapter }) => {
  const [hoverColour, setHoverColour] = useState('text-white');
  //   console.log(chapter);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(chapter.attributes.createdAt).toLocaleDateString(
    'en-US',
    options
  );

  // Handle mouse hover over image
  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
  };

  // Handle mouse hover out from image
  const handleHoverOut = () => {
    setHoverColour('text-white');
  };

  const handleClick = () => {
    axios
      .get(`https://api.mangadex.org/at-home/server/${chapter.id}`)
      .then((resp) => {
        console.log(resp);
        // https://cmdxd98sb0x3yprd.mangadex.network/
        // data OR data-saver /
        // hash /
        // 1-a7a414491dfd94d5031e1cbce0b11eb992f0df59ce111f1799f1024af460984c.jpg
      })
      .catch((error) => {
        console.error('Error fetching chapter:', error);
      });
  };
  return (
    <div
      className={`chapter btn w-100  text-center py-2 rounded bg-primary px-4 my-2 ${hoverColour}`}
      onMouseOver={handleHoverOver}
      onMouseOut={handleHoverOut}
      onClick={handleClick}
    >
      <p className='fw-semibold'>{`Chapter ${chapter.attributes.chapter}`}</p>
      <p className='py-0 my-0'>{date}</p>
    </div>
  );
};

export default Chapters;
