const express = require('express');
const cors = require('cors');
const path = require('path');
const client = require('prom-client');  

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

let produits = [
  { id: 1, nom: 'Ordinateur Portable', prix: 1200, stock: 20, image: '/images/ordinateur.jpg' },
  { id: 2, nom: 'Clavier Mécanique', prix: 50, stock: 15, image: '/images/clavier.jpg' },
  { id: 3, nom: 'Souris Gaming', prix: 30, stock: 10, image: '/images/souris-gaming.jpg' },
  { id: 4, nom: 'Écran 27" 4K', prix: 400, stock: 8, image: '/images/ecran-27.jpg' },
  { id: 5, nom: 'Casque Audio', prix: 150, stock: 12, image: '/images/casque.jpg' }
];

// Create a Prometheus Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom Metric: Number of requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestCounter);

// Middleware to track requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
});

// Endpoint for Prometheus Metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Endpoint pour récupérer les produits
app.get('/produits', (req, res) => {
  res.json(produits);
});

// Endpoint pour ajouter un produit
app.post('/produits', (req, res) => {
  const { nom, prix, stock, image } = req.body;
  if (!nom || !prix || !stock || !image) {
    return res.status(400).json({ message: 'Nom, prix, stock et image requis' });
  }

  const nouveauProduit = { id: produits.length + 1, nom, prix, stock, image };
  produits.push(nouveauProduit);
  res.json(nouveauProduit);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ App is running on http://localhost:${port}`);
  console.log(`📊 Metrics available at http://localhost:${port}/metrics`);
});

module.exports = app;
