import sequelize from "./dbclient.js"; // Importation de sequelize (dbClient)
import { User } from "./User.js";
import { Profile } from "./Profile.js";
import { Reservation } from "./Reservation.js";
import { Pass } from "./Pass.js";
import { Hotel } from "./Hotel.js";
import { Attraction } from "./Attraction.js";

// Initialisation des modèles
export const models = {
  User: User.init(sequelize),
  Profile: Profile.init(sequelize),
  Reservation: Reservation.init(sequelize),
  Pass: Pass.init(sequelize),
  Hotel: Hotel.init(sequelize),
  Attraction: Attraction.init(sequelize),
};

// Associations entre les modèles (si nécessaire)
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));
