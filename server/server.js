require('dotenv').config(); // charge les variables d'environnement depuis .env

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Utilisation des variables d'environnement avec fallback
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Endpoint guest experience: conseil du jour
app.get('/api/advice', async (req, res) => {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice');
    const { advice } = response.data.slip;
    res.json({ advice });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Impossible de récupérer le conseil.' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
