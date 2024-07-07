const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();
const authenticateToken = require("../middleWare/auth");

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = "http://api.openweathermap.org/data/2.5";
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const VISUAL_CROSSING_API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  // CURRENT WEATHER
router.get("/current", authenticateToken, async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res
        .status(400)
        .json({ error: "City query parameter is required" });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching current weather data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// FORCAST

router.get("/forecasts", authenticateToken, async (req, res) => {
  try {
    const { city } = req.query;
    console.log("City:", city);

    if (!city) {
      return res
        .status(400)
        .json({ error: "City query parameter is required" });
    }

    // Get the 5-day/3-hour forecast using the forecast endpoint
    const forecastResponse = await axios.get(
      `${WEATHER_API_BASE_URL}/forecast`,
      {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }
    );
    console.log(WEATHER_API_KEY);
    console.log("Forecast Response:", forecastResponse.data);

    res.json(forecastResponse.data);
  } catch (error) {
    console.error("Error fetching forecast data:", error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request data:", error.request);
      res
        .status(500)
        .json({ error: "No response received from the weather API" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
      res.status(500).json({ error: "Error in setting up the request" });
    }
  }
});

// HISTORICAL DATA

router.get("/historical", authenticateToken, async (req, res) => {
  try {
    const { city } = req.query;
    console.log("City:", city);

    if (!city) {
      return res
        .status(400)
        .json({ error: "City query parameter is required" });
    }

    // Calculate date range (5 days ago to yesterday)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1); // Yesterday
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 4); // 5 days ago

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // Fetch historical data
    const historicalResponse = await axios.get(
      `${VISUAL_CROSSING_API_BASE_URL}/${city}/${formattedStartDate}/${formattedEndDate}`,
      {
        params: {
          unitGroup: "metric",
          key: VISUAL_CROSSING_API_KEY,
          contentType: "json",
        },
      }
    );
    console.log(
      `API Request URL: ${VISUAL_CROSSING_API_BASE_URL}/${city}/${formattedStartDate}/${formattedEndDate}`
    );

    console.log("Historical Response:", historicalResponse.data);

    // Transform the data to match the structure of your forecast endpoint
    const transformedData = {
      city: {
        name: historicalResponse.data.address,
        country: historicalResponse.data.resolvedAddress
          .split(",")
          .pop()
          .trim(),
      },
      list: historicalResponse.data.days.map((day) => ({
        dt: new Date(day.datetime).getTime() / 1000,
        main: {
          temp: day.temp,
          feels_like: day.feelslike,
          temp_min: day.tempmin,
          temp_max: day.tempmax,
          pressure: day.pressure,
          humidity: day.humidity,
        },
        weather: [
          {
            main: day.conditions,
            description: day.description,
            icon: day.icon,
          },
        ],
        wind: {
          speed: day.windspeed,
          deg: day.winddir,
        },
        dt_txt: `${day.datetime} 12:00:00`,
      })),
    };

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching historical data:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error("Request data:", error.request);
      res
        .status(500)
        .json({ error: "No response received from the weather API" });
    } else {
      console.error("Error message:", error.message);
      res.status(500).json({ error: "Error in setting up the request" });
    }
  }
});

module.exports = router;
