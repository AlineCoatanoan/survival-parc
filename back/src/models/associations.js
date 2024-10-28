import { sequelize } from "./dbclient.js";
import { User } from "./User.js";
import { Profile } from "./Profile.js";
import { Reservation } from "./Reservation.js";
import { Pass } from "./Pass.js";
import { Hotel } from "./Hotel.js";
import { Attraction } from "./Attraction.js";

// Initialisation des modèles et associations
export const initializeModels = () => {
  const models = {
    User: User.init(sequelize),
    Profile: Profile.init(sequelize),
    Reservation: Reservation.init(sequelize),
    Pass: Pass.init(sequelize),
    Hotel: Hotel.init(sequelize),
    Attraction: Attraction.init(sequelize),
  };

  // Associations entre les modèles
  User.hasOne(Profile, { foreignKey: "userId", sourceKey: "id" });
  Profile.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  User.hasMany(Reservation, { foreignKey: "userId", sourceKey: "id" });
  Reservation.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  Hotel.hasMany(Reservation, { foreignKey: "hotelId", sourceKey: "id" });
  Reservation.belongsTo(Hotel, { foreignKey: "hotelId", targetKey: "id" });

  Attraction.hasMany(Reservation, {
    foreignKey: "attractionId",
    sourceKey: "id",
  });
  Reservation.belongsTo(Attraction, {
    foreignKey: "attractionId",
    targetKey: "id",
  });

  return models; // Retourner les modèles initialisés
};
