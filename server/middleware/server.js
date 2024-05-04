import express from 'express';
import axios from 'axios';
import cors from 'cors';

// Create an instance of Express
const app = express();
app.use(cors());

////////////////////////////////////////////////////////////////////////////////////

// Define a route to handle fetching the latest manga chapters and their details
app.get('/api/mangadex/latest', async (req, res) => {
  const baseUrl = 'https://api.mangadex.org';

  try {
    // Fetch latest manga chapters
    const chapterResponse = await axios.get(`${baseUrl}/chapter`, {
      params: {
        includes: ['scanlation_group'],
        contentRating: ['safe', 'suggestive', 'erotica'],
        order: { readableAt: 'desc' },
        limit: 30,
      },
      headers: {
        'User-Agent': 'MyServer/1.0',
      },
    });

    // Extract unique manga IDs
    const uniqueMangaIds = [
      ...new Set(
        chapterResponse.data.data.map((chapter) => {
          return chapter.relationships.find(
            (relationship) => relationship.type === 'manga'
          ).id;
        })
      ),
    ];

    // Fetch manga data based on unique manga IDs
    const mangaResponse = await axios.get(`${baseUrl}/manga`, {
      params: {
        limit: 64,
        includedTagsMode: 'AND',
        excludedTagsMode: 'OR',
        ids: uniqueMangaIds,
        contentRating: ['safe', 'suggestive', 'erotica'],
        order: { latestUploadedChapter: 'desc' },
        includes: ['cover_art'],
        hasAvailableChapters: true,
      },
      headers: {
        'User-Agent': 'MyServer/1.0',
      },
    });

    // Prepare the response object with chapter and manga data
    const response = {
      latestData: chapterResponse.data.data,
      coverImages: mangaResponse.data.data,
    };

    // Send the combined data back to the client
    res.json(response);
  } catch (error) {
    console.error('Error fetching manga data:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Helper function to compute the timestamp for one month ago at midnight
const getMidnightTimestampOneMonthAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setHours(0, 0, 0, 0); // Set time to midnight
  return date.toISOString();
};

// Route to fetch popular manga from MangaDex
app.get('/api/mangadex/popular', async (req, res) => {
  const baseUrl = 'https://api.mangadex.org';

  try {
    // Fetch popular manga details
    const mangaResponse = await axios.get(`${baseUrl}/manga`, {
      params: {
        limit: 10,
        order: { followedCount: 'desc' },
        includes: ['cover_art', 'artist', 'author'],
        contentRating: ['safe', 'suggestive'],
        hasAvailableChapters: true,
      },
      headers: {
        'User-Agent': 'MyServer/1.0',
      },
    });

    res.json(mangaResponse.data);
  } catch (error) {
    console.error('Error fetching popular manga:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////////////
app.get('/api/mangadex/chapters/:mangaID', async (req, res) => {
  const { mangaID } = req.params;
  const baseUrl = 'https://api.mangadex.org';
  const languages = ['en'];
  const contentRatings = ['safe', 'suggestive', 'erotica'];

  try {
    const response = await axios.get(`${baseUrl}/manga/${mangaID}/feed`, {
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
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching manga chapters:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});
////////////////////////////////////////////////////////////////////////////////////
app.get('/api/mangadex/chapter/:chapterID', async (req, res) => {
  const { chapterID } = req.params;
  const baseUrl = 'https://api.mangadex.org';

  try {
    const response = await axios.get(`${baseUrl}/at-home/server/${chapterID}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching chapter data:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Define a route to proxy requests for cover images
app.get('/api/mangadex/cover/:mangaId/:fileName', async (req, res) => {
  const { mangaId, fileName } = req.params;
  const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;

  try {
    // Forward the request to the MangaDex cover image URL with appropriate User-Agent
    const response = await axios.get(coverUrl, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'MyServer/1.0', // Example User-Agent; adjust as necessary
      },
    });

    // Set the appropriate content type header and CORS headers
    res.set({
      'Content-Type': 'image/jpeg',
      'Access-Control-Allow-Origin': '*',
    });

    // Pipe the response from MangaDex to the response to the client
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying cover image request:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Define a route to handle requests for staff picks
app.get('/api/mangadex/staffpicks', async (req, res) => {
  const baseUrl = 'https://api.mangadex.org';
  try {
    const resp = await axios.get(
      `${baseUrl}/list/805ba886-dd99-4aa4-b460-4bd7c7b71352?includes[]=user`,
      {
        headers: {
          'User-Agent': 'MyServer/1.0',
        },
      }
    );
    const pickIds = resp.data.data.relationships.map((pick) => pick.id);
    res.json({ success: true, picks: pickIds });
  } catch (error) {
    console.error('Error fetching staff picks:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Define a route to handle requests for staff manga
app.get('/api/mangadex/staffmanga', async (req, res) => {
  const baseUrl = 'https://api.mangadex.org';
  const { limit, ids } = req.query; // Changed mangaIdParams to ids

  if (!ids || ids.length === 0) {
    console.error('IDs parameter is undefined or empty.');
    return res.status(400).send('Required manga ID parameters are missing.');
  }

  // Convert the ids array into a URL-encoded string
  const idsParams = ids
    .map((id) => `ids%5B%5D=${encodeURIComponent(id)}`)
    .join('&');

  const constructedUrl = `${baseUrl}/manga?limit=${limit}&includedTagsMode=AND&excludedTagsMode=OR&${idsParams}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=desc&includes[]=cover_art&hasAvailableChapters=true`;
  console.log('Constructed URL for manga API call:', constructedUrl);

  try {
    const resp = await axios.get(constructedUrl, {
      headers: {
        'User-Agent': 'MyServer/1.0',
      },
    });
    res.json({ success: true, manga: resp.data });
  } catch (error) {
    console.error('Error fetching manga data:', error);
    res
      .status(error.response?.status || 500)
      .send(error.response?.statusText || 'Internal Server Error');
  }
});
////////////////////////////////////////////////////////////////////////////////////

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
