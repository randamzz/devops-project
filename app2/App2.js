const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Endpoint pour récupérer les produits depuis App 1
app.get('/getProduits', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/produits');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de communication avec App 1' });
  }
});

app.listen(port, () => {
  console.log(`✅ App 2 en écoute sur http://localhost:${port}`);
});
