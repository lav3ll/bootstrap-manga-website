import React from 'react';

const SliderItem = ({ imageData }) => {
  const mangaId = imageData.id;
  const fileName = imageData.relationships.find(
    (relationship) => relationship.type === 'cover_art'
  ).attributes.fileName;

  const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
  const title = imageData.attributes.title.en
    ? imageData.attributes.title.en
    : imageData.attributes.title[0];
  return (
    <div className='slide-container w-100'>
      <div className='mangaSlideInfo'>
        <p className=''></p>
      </div>
      <img
        src={src}
        alt={`${imageData.title} slider background image`}
        className='w-100 slide-img'
      />
      <div className='position-absolute top-50 end-0 translate-middle-y row'>
        <img
          className=' rounded rounded-4 slide-img-sm ms-auto me-5'
          src={src}
          alt={`${imageData.title} slider image`}
        />
      </div>
    </div>
  );
};

export default SliderItem;
