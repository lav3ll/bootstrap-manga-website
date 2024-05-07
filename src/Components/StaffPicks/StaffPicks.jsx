import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pick from './Pick';

const StaffPicks = () => {
  const [staffPickIds, setStaffPickIds] = useState([]);
  const [staffMangas, setStaffMangas] = useState([]);
  const baseUrl =
    'https://elitescans-data-a61945b29883.herokuapp.com/api/mangadex';

  useEffect(() => {
    const getStaffPicks = async () => {
      try {
        const resp = await axios.get(`${baseUrl}/staffpicks`);
        const pickIds = resp.data.picks;
        setStaffPickIds(pickIds);
        await showStaffPicks(pickIds);
      } catch (error) {
        console.error(
          'Error fetching staff picks:',
          error.response ? error.response.data : error.message
        );
      }
    };

    getStaffPicks();
  }, []);

  const showStaffPicks = async (returnedPicks) => {
    const mangaIdParams = returnedPicks
      .map((id) => `ids%5B%5D=${encodeURIComponent(id)}`)
      .join('&');
    if (mangaIdParams) {
      const url = `${baseUrl}/staffmanga?limit=${10}&${mangaIdParams}`;
      // console.log('Fetching manga with URL:', url);

      try {
        const resp = await axios.get(url);
        setStaffMangas(resp.data.manga.data);
      } catch (error) {
        console.error(
          'Error fetching manga data:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className='mt-4 custom-secondary-bg-color rounded-2 custom-test d-none d-md-block'>
      <h6 className='fw-semibold ms-2 text-white text-center pt-2'>
        Staff Picks
      </h6>
      {staffMangas.map((manga, idx) => (
        <Pick key={idx} staffManga={manga} index={idx} />
      ))}
    </div>
  );
};

export default StaffPicks;
