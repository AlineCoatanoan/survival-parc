import { Model, DataTypes } from "sequelize";

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
        priceByNight: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        numberOfPeople: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.DECIMAL(10, 2),
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
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Profile, {
      foreignKey: "profileId",
      as: "profile",
    });
    this.belongsTo(models.Hotel, {
      foreignKey: "hotelId",
      as: "hotel",
    });
  }
}
