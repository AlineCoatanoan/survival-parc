import User from "./User.js";
import Profile from "./Profile.js";
import Hotel from "./Hotel.js";
import Attraction from "./Attraction.js";
import Reservation from "./Reservation.js";

const associations = () => {
  // Associations entre User et Profile
  User.hasOne(Profile, { foreignKey: "userId", sourceKey: "id" });
  Profile.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  // Associations entre User et Reservation
  User.hasMany(Reservation, { foreignKey: "userId", sourceKey: "id" });
  Reservation.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  // Associations entre Hotel et Reservation
  Hotel.hasMany(Reservation, { foreignKey: "hotelId", sourceKey: "id" });
  Reservation.belongsTo(Hotel, { foreignKey: "hotelId", targetKey: "id" });

  // Associations entre Attraction et Reservation
  Attraction.hasMany(Reservation, {
    foreignKey: "attractionId",
    sourceKey: "id",
  });
  Reservation.belongsTo(Attraction, {
    foreignKey: "attractionId",
    targetKey: "id",
  });
};

export default associations;
