const request = require('supertest');
const express = require('express');
const app = require('./server');

describe('Tests API Produits', () => {
  it('📥 GET /produits - Devrait récupérer la liste des produits', async () => {
    const response = await request(app).get('/produits');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('➕ POST /produits - Devrait ajouter un nouveau produit', async () => {
    const nouveauProduit = {
      nom: 'Webcam HD',
      prix: 70,
      stock: 5,
      image: '/images/webcam.jpg'
    };

    const response = await request(app).post('/produits').send(nouveauProduit);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nom).toBe(nouveauProduit.nom);
  });

  it('❌ POST /produits - Devrait renvoyer une erreur si des champs sont manquants', async () => {
    const produitIncomplet = {
      nom: 'Clé USB',
      prix: 20
    };

    const response = await request(app).post('/produits').send(produitIncomplet);
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Nom, prix, stock et image requis');
  });
});
