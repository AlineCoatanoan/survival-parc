// models/ProfileHotel.js
import { Model, DataTypes, Op } from "sequelize";

export class ProfileHotel extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        profileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "profiles", // Table de référence
            key: "id", // Clé primaire de la table "profiles"
          },
          onDelete: "CASCADE",
        },
        hotelId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "hotels", // Table de référence
            key: "id", // Clé primaire de la table "hotels"
          },
          onDelete: "CASCADE",
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "pending", // Statut par défaut
        },
      },
      {
        sequelize,
        modelName: "ProfileHotel",
        tableName: "profile_hotels", // Le nom de la table dans la base de données
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["profileId", "hotelId", "startDate"],
          },
          // Vous pouvez aussi indexer sur (profileId, hotelId, startDate, endDate) si vous préférez
        ],
      }
    );
  }

  static associate(models) {
    // Correctement associer Profile -> ProfileHotel
    this.belongsTo(models.Profile, {
      foreignKey: "profileId", // La clé étrangère dans ProfileHotel
      as: "profile", // Alias pour l'association vers Profile
    });

    // Correctement associer Hotel -> ProfileHotel
    this.belongsTo(models.Hotel, {
      foreignKey: "hotelId", // La clé étrangère dans ProfileHotel
      as: "hotel", // Alias pour l'association vers Hotel
    });
  }
}
