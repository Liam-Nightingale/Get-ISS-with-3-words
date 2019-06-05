const express = require('express');
const fetch = require('node-fetch')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}!`));
app.use(express.static('public'));
app.use(express.json());
app.get('/words/:latlon', async (req, res) => {
  const latlon = req.params.latlon.split(',')
  console.log(`request recieved, contents: ${latlon}`);
  const lat = latlon[0];
  const lon = latlon[1];
  const api_key = process.env.THREE_WORD_API_KEY;
  const words_url = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${lat},${lon}&key=${api_key}`;
  const words_res = await fetch(words_url);
  const words_data = await words_res.json();
  res.json(words_data);
});