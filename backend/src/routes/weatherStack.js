const express = require('express');
const axios = require('axios');

const router = express.Router();

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const WEATHERSTACK_API_BASE_URL = 'http://api.weatherstack.com';

router.get('/current', async (req, res) => {
  try {
    const { city } = req.query;
    const response = await axios.get(`${WEATHERSTACK_API_BASE_URL}/current`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: city,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching current weather data' });
  }
});

router.get('/forecast', async (req, res) => {
  // Note: Weatherstack does not provide a forecast endpoint in the free tier.
  // You'll need a different API for forecast data.
  res.status(501).json({ error: 'Forecast data not available from Weatherstack free tier' });
});

router.get('/historical', async (req, res) => {
  try {
    const { city, date } = req.query;
    const response = await axios.get(`${WEATHERSTACK_API_BASE_URL}/historical`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: city,
        historical_date: date,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historical data' });
  }
});

module.exports = router;
