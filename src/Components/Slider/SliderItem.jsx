import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SliderItem = ({ imageData }) => {
  const [showGenres, setShowGenres] = useState('');
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [imageId, setImageId] = useState(imageData);

  const mangaId = imageData.id;
  useEffect(() => {
    const fileName = imageData.relationships.find(
      (relationship) => relationship.type === 'cover_art'
    ).attributes.fileName;

    const src = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
    const title = imageData.attributes.title.en
      ? imageData.attributes.title.en
      : imageData.attributes.title[0];

    const status = imageData.attributes.status;
    const genresTags = imageData.attributes.tags.filter(
      (tag) => tag.attributes.group === 'genre'
    );
    const description = imageData.attributes.description.en
      ? imageData.attributes.description.en
      : 'No Summary available';
    setShowGenres(genresTags.slice(0, 3));
    setCoverImage(src);
    setTitle(title);
    setStatus(status);
    setSummary(description.slice(0, 177) + '...');
  }, []);
  return (
    <div className='slide-container w-100 '>
      <div
        className='background-image'
        style={{
          backgroundImage: `url("${coverImage}")`,
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${coverImage}")`,
          backgroundSize: 'cover',
          height: '100%',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          WebkitFilter: 'blur(8px)',
          position: 'absolute',
          zIndex: -1,
        }}
      ></div>

      <div className='row ms-5'>
        <div className='mangaSlideInfo col-7  text-start'>
          <h4 className='text-white'>{title}</h4>
          <p className='text-white'>
            Genres :
            {showGenres &&
              showGenres.map((genre, idx) => (
                <span className='slider-genre' key={idx}>
                  {genre.attributes.name.en},{' '}
                </span>
              ))}
          </p>
          <p className='fw-bold text-white slider-summary-heading'>SUMMARY</p>
          <p className='slider-summary-txt text-white '>{summary}</p>
          <p className='slider-status-txt  text-white fw-semibold'>
            status:{status}
          </p>
        </div>

        <Link
          to={`/manga-info/${imageData.id}`}
          state={{ manga: { coverImg: coverImage, info: imageId } }}
          key={imageData.id}
          className='col-4 px-0 position-absolute top-50 end-0 translate-middle-y row slide-img-sm ms-auto me-5'
        >
          <img
            className=' rounded rounded-4   '
            src={coverImage}
            alt={`${imageData.title} slider image`}
          />
        </Link>
      </div>
    </div>
  );
};

export default SliderItem;
