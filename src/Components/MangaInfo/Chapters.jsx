import React from 'react';
import { useState } from 'react';

const Chapters = ({ chapter }) => {
  const [hoverColour, setHoverColour] = useState('text-white');
  console.log(chapter);

  // Handle mouse hover over image
  const handleHoverOver = () => {
    setHoverColour('custom-text-purple');
  };

  // Handle mouse hover out from image
  const handleHoverOut = () => {
    setHoverColour('text-white');
  };
  return (
    <div
      className={`chapter btn w-100  text-center py-2 rounded bg-primary px-4 my-2 ${hoverColour}`}
      onMouseOver={handleHoverOver}
      onMouseOut={handleHoverOut}
    >
      <p>{`Chapter ${chapter.attributes.chapter}`}</p>
      <p></p>
    </div>
  );
};

export default Chapters;
