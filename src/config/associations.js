import { sequelize } from "./dbclient.js";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { Reservation } from "../models/Reservation.js";
import { Pass } from "../models/Pass.js";
import { Hotel } from "../models/Hotel.js";
import { Animation } from "../models/Animation.js";

// Initialisation des modèles et associations
export const initializeModels = () => {
  const models = {
    User: User.init(sequelize),
    Profile: Profile.init(sequelize),
    Reservation: Reservation.init(sequelize),
    Pass: Pass.init(sequelize),
    Hotel: Hotel.init(sequelize),
    Animation: Animation.init(sequelize),
  };

  // Associations entre les modèles
  User.hasOne(Profile, { foreignKey: "userId", sourceKey: "id" });
  Profile.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  User.hasMany(Reservation, { foreignKey: "userId", sourceKey: "id" });
  Reservation.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  Hotel.hasMany(Reservation, { foreignKey: "hotelId", sourceKey: "id" });
  Reservation.belongsTo(Hotel, { foreignKey: "hotelId", targetKey: "id" });

  Pass.hasMany(Reservation, { foreignKey: "passId", sourceKey: "id" });
  Reservation.belongsTo(Pass, { foreignKey: "passId", targetKey: "id" });

  Animation.hasMany(Reservation, {
    foreignKey: "animationId",
    sourceKey: "id",
  });
  Reservation.belongsTo(Animation, {
    foreignKey: "animationId",
    targetKey: "id",
  });

  return models; // Retourner les modèles initialisés
};
