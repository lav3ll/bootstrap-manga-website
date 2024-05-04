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
      <div
        className='background-image'
        style={{
          backgroundImage: `url("${src}")`,
          backgroundSize: 'cover',
          height: '100%',
          backgroundPosition: 'center',
          position: 'absolute',
          filter: 'blur(3px)',
          WebkitFilter: 'blur(2px)',
          zIndex: -1,
        }}
      ></div>
      <div
        className='background-image'
        style={{
          backgroundImage: `url("${src}")`,
          backgroundSize: 'cover',
          height: '100%',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          WebkitFilter: 'blur(8px)',
          position: 'absolute',
          zIndex: -1,
        }}
      ></div>

      <div>
        <div className='mangaSlideInfo'>
          <p className=''>title</p>
          <p className=''>genre</p>
          <p className=''>summary</p>
          <p className=''>status</p>
          <p className=''>author</p>
        </div>

        <div className='position-absolute top-50 end-0 translate-middle-y row'>
          <img
            className=' rounded rounded-4 slide-img-sm ms-auto me-5'
            src={src}
            alt={`${imageData.title} slider image`}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
