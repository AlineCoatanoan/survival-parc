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

  // Appel explicite de 'associate' pour chaque modèle qui en a une
  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models); // Appelle la méthode associate de chaque modèle
    }
  });

  // Associations entre les modèles
  User.hasOne(Profile, { foreignKey: "userId", sourceKey: "id" });
  Profile.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  Profile.hasMany(Reservation, { foreignKey: "profileId", sourceKey: "id" });
  Reservation.belongsTo(Profile, { foreignKey: "profileId", targetKey: "id" });

  // Dans le modèle Profile
  Profile.belongsToMany(Hotel, {
    through: ProfileHotel,
    foreignKey: "profileId",
    otherKey: "hotelId",
    as: "profileHotels", // Nouveau nom d'alias
  });

  // Dans le modèle Hotel
  Hotel.belongsToMany(Profile, {
    through: ProfileHotel,
    foreignKey: "hotelId",
    otherKey: "profileId",
    as: "hotelProfiles", // Nouveau nom d'alias
  });

  return models;
};
