// dbclient.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

// Fonction pour connecter et synchroniser la base de données
const connectAndSyncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ Connection to the database has been established successfully."
    );

    // Assurez-vous que le chemin ici est correct
    const { initializeModels } = await import("./associations.js");
    initializeModels();

    // Supprimez la synchronisation automatique si vous ne la souhaitez pas
    // await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized with models.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

// Appel de la fonction pour établir la connexion
connectAndSyncDatabase();
