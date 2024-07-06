const express = require('express');
const axios = require('axios');

const router = express.Router();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'http://api.openweathermap.org/data/2.5';

router.get('/current', async (req, res) => {
  try {
    const { city } = req.query;
    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

router.get('/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forecast data' });
  }
});

router.get('/historical', async (req, res) => {
  // Note: OpenWeatherMap's free tier doesn't provide historical data.
  // You might need to use a different API or implement a workaround.
  res.status(501).json({ message: 'Historical data not available' });
});

module.exports = router;