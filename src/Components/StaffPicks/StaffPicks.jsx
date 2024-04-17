import React, { useEffect, useState } from 'react';
import Pick from './Pick';
import axios from 'axios';

const StaffPicks = () => {
  const [staffPickIds, setStaffPickIds] = useState([]);
  const [staffMangas, setStaffMangas] = useState([]);

  useEffect(() => {
    const getStaffPicks = async () => {
      try {
        const resp = await axios.get(
          'https://api.mangadex.org/list/805ba886-dd99-4aa4-b460-4bd7c7b71352?includes[]=user'
        );
        const pickIds = resp.data.data.relationships.map((pick) => pick.id);
        setStaffPickIds(pickIds);
        await showStaffPicks(pickIds);
      } catch (error) {
        console.error('Error fetching staff picks:', error);
      }
    };

    getStaffPicks();
  }, []);

  const showStaffPicks = async (returnedPicks) => {
    const baseUrl = 'https://api.mangadex.org';

    try {
      if (returnedPicks.length > 0) {
        const mangaIdParams = returnedPicks
          .map((id) => `ids%5B%5D=${id}`)
          .join('&');

        const resp = await axios.get(
          `${baseUrl}/manga?limit=${returnedPicks.length}&includedTagsMode=AND&excludedTagsMode=OR&${mangaIdParams}&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true`
        );

        setStaffMangas(resp.data.data);
      }
    } catch (error) {
      console.error('Error fetching manga data:', error);
    }
  };

  return (
    <>
      <div className='mt-4  bg-primary rounded-2'>
        <h6 className='fw-semibold ms-2  text-white text-center'>
          Staff Picks
        </h6>
        {staffMangas.map((manga, idx) => (
          <Pick key={idx} staffManga={manga} index={idx} />
        ))}
      </div>
    </>
  );
};

export default StaffPicks;
