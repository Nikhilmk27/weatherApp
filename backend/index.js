const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes/auth.js');
const weatherRoutes = require('./src/routes/weather');
const favoriteRoutes = require('./src/routes/favorites');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));