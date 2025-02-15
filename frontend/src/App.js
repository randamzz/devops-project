import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produits")
      .then((response) => setProduits(response.data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <div>
      {/* Ajout du CSS en ligne */}
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }

          .container {
            max-width: 900px;
            margin: 50px auto;
            background: white;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            text-align: center;
          }

          h1 {
            color: #333;
            margin-bottom: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: center;
          }

          th {
            background-color: #007bff;
            color: white;
          }

          tr:hover {
            background-color: #f1f1f1;
          }

          .in-stock {
            color: green;
            font-weight: bold;
          }

          .out-of-stock {
            color: red;
            font-weight: bold;
          }

          .product-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 5px;
          }
        `}
      </style>

      {/* Contenu de l'application */}
      <div className="container">
        <h1>📦 Liste des Produits </h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>{produit.id}</td>
                <td>
                  <img src={produit.image} alt={produit.nom} className="product-image" />
                </td>
                <td>{produit.nom}</td>
                <td><strong>${produit.prix}</strong></td>
                <td>{produit.stock}</td>
                <td className={produit.stock > 0 ? "in-stock" : "out-of-stock"}>
                  {produit.stock > 0 ? "En Stock" : "Rupture"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
