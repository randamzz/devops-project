const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images locales)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Liste des produits avec des images locales
let produits = [
  {
    id: 1,
    nom: 'Ordinateur Portable',
    prix: 1200,
    stock: 20,
    image: '/images/ordinateur.jpg'  // Image locale
  },
  {
    id: 2,
    nom: 'Clavier Mécanique',
    prix: 50,
    stock: 15,
    image: '/images/clavier.jpg'  // Image locale
  },
  {
    id: 3,
    nom: 'Souris Gaming',
    prix: 30,
    stock: 10,
    image: '/images/souris-gaming.jpg'  // Image locale
  },
  {
    id: 4,
    nom: 'Écran 27" 4K',
    prix: 400,
    stock: 8,
    image: '/images/ecran-27.jpg'  // Image locale
  },
  {
    id: 5,
    nom: 'Casque Audio',
    prix: 150,
    stock: 12,
    image: '/images/casque.jpg'  // Image locale
  }
];

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

app.listen(port, () => {
  console.log(`✅ App 1 (Produits) en écoute sur http://localhost:${port}`);
});
