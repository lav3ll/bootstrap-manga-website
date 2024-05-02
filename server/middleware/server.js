// // server.js

// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// const app = express();

// // Define proxy middleware for routing
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'https://api.mangadex.org',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': '', // Rewrite /api to / (optional)
//     },
//   })
// );

// // Define other routes or middleware as needed

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import express from 'express';
import axios from 'axios';
import cors from 'cors';

// Create an instance of Express
const app = express();
app.use(cors());

// Define a route to proxy requests for cover images
app.get('/api/mangadex/cover/:mangaId/:fileName', async (req, res) => {
  const { mangaId, fileName } = req.params;
  const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}.256.jpg`;

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
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// is this:
// https://api.mangadex.org/manga?limit=24&includedTagsMode=AND&excludedTagsMode=OR&undefined&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&con
// tentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true;

// the same as this?
// const baseUrl = 'https://api.mangadex.org';

//     try {
//       if (returnedPicks.length > 0) {
//         const mangaIdParams = returnedPicks
//           .map((id) => `ids%5B%5D=${id}`)
//           .join('&');

//         const resp = await axios.get(
//           `${baseUrl}/manga?limit=${returnedPicks.length}&includedTagsMode=AND&excludedTagsMode=OR&${mangaIdParams}&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&hasAvailableChapters=true`
//         );
