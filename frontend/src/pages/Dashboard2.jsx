import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, Card, CardContent, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const WeatherIcon = styled('img')({
  width: '50px',
  height: '50px',
});

function Dashboard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchWeather = async () => {
    try {
      const currentWeatherResponse = await axios.get(`http://localhost:5000/api/weather/current?city=${city}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setWeatherData(currentWeatherResponse.data);

      const forecastResponse = await axios.get(`http://localhost:5000/api/weather/forecasts?city=${city}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setForecastData(forecastResponse.data.list);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites', error);
    }
  };

  const addToFavorites = async () => {
    try {
      await axios.post('http://localhost:5000/api/favorites', { city }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchFavorites();
    } catch (error) {
      console.error('Error adding to favorites', error);
    }
  };

  const groupForecastByDay = (forecast) => {
    return forecast.reduce((acc, item) => {
      const date = dayjs(item.dt_txt).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = item;
      }
      return acc;
    }, {});
  };

  const groupedForecast = groupForecastByDay(forecastData);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Weather Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Enter city"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mr: 1 }}
          />
          <IconButton onClick={fetchWeather} color="primary" size="large">
            <SearchIcon />
          </IconButton>
          <IconButton onClick={addToFavorites} color="secondary" size="large">
            <FavoriteIcon />
          </IconButton>
        </Box>

        {weatherData && (
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5">{weatherData.name}</Typography>
                  <Typography variant="h2">{Math.round(weatherData.main.temp)}°C</Typography>
                  <Typography>{weatherData.weather[0].description}</Typography>
                </Box>
                <WeatherIcon src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography>Humidity: {weatherData.main.humidity}%</Typography>
                <Typography>Wind: {weatherData.wind.speed} m/s</Typography>
              </Box>
            </CardContent>
          </StyledCard>
        )}

        <Typography variant="h5" gutterBottom>
          5-Day Forecast
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Object.values(groupedForecast).slice(0, 5).map((forecast) => (
            <Grid item xs={12} sm={2.4} key={forecast.dt}>
              <StyledCard>
                <CardContent>
                  <Typography variant="subtitle1">{dayjs(forecast.dt_txt).format('ddd, MMM D')}</Typography>
                  <WeatherIcon src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather icon" />
                  <Typography variant="h6">{Math.round(forecast.main.temp)}°C</Typography>
                  <Typography variant="body2">{forecast.weather[0].description}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom>
          Favorite Cities
        </Typography>
        <Grid container spacing={2}>
          {favorites.map((fav) => (
            <Grid item xs={12} sm={6} md={4} key={fav.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6">{fav.name}</Typography>
                  {/* You'll need to fetch current weather for each favorite city */}
                  <Typography>Temperature: --°C</Typography>
                  <Typography>Description: --</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;