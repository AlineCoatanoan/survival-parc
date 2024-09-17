// Le fichier dbclient.js sert à configurer et établir une connexion à la BDD en utilisant Sequelize

import 'dotenv/config'; //Charge les variables d'environnement définies dans le fichier .env.
import { Sequelize } from 'sequelize'; //ORM utilisée pour interagir avec la BDD. Il fournit des méthodes pour définir des modèles, exécuter des requêtes et gérer la BDD.

//Crée et exporte une instance de Sequelize, configurée pour se connecter à la BDD.
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

// Synchroniser les modèles avec la base de données
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
