import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/current?city=${city}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setWeatherData(response.data);
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

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <TextField
        label="City"
        fullWidth
        margin="normal"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={fetchWeather} variant="contained" color="primary">
        Get Weather
      </Button>
      <Button onClick={addToFavorites} variant="contained" color="secondary">
        Add to Favorites
      </Button>
      {weatherData && (
        <Card>
          <CardContent>
            <Typography variant="h5">{weatherData.name}</Typography>
            <Typography>Temperature: {weatherData.main.temp}°C</Typography>
            <Typography>Humidity: {weatherData.main.humidity}%</Typography>
            <Typography>Wind Speed: {weatherData.wind.speed} m/s</Typography>
          </CardContent>
        </Card>
      )}
      <Typography variant="h5" gutterBottom>
        Favorite Cities
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((fav) => (
          <Grid item xs={12} sm={6} md={4} key={fav.id}>
            <Card>
              <CardContent>
                <Typography>{fav.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;