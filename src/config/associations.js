import { sequelize } from "./dbclient.js";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { Reservation } from "../models/Reservation.js";
import { Hotel } from "../models/Hotel.js";
import { Animation } from "../models/Animation.js";
import { ProfileHotel } from "../models/ProfileHotel.js";

// Initialisation des modèles et associations
export const initializeModels = () => {
  const models = {
    User: User.init(sequelize),
    Profile: Profile.init(sequelize),
    Reservation: Reservation.init(sequelize),
    Hotel: Hotel.init(sequelize),
    Animation: Animation.init(sequelize),
    ProfileHotel: ProfileHotel.init(sequelize),
  };

  // Associations entre les modèles
  User.hasOne(Profile, { foreignKey: "userId", sourceKey: "id" });
  Profile.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  Profile.hasMany(Reservation, { foreignKey: "profileId", sourceKey: "id" });
  Reservation.belongsTo(Profile, { foreignKey: "profileId", targetKey: "id" });

  Profile.belongsToMany(Hotel, {
    through: models.ProfileHotel,
    foreignKey: "profileId",
  });
  Hotel.belongsToMany(Profile, {
    through: models.ProfileHotel,
    foreignKey: "hotelId",
  });

  return models;
};
