import { Model, DataTypes } from "sequelize";

export class Hotel extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [5, 10],
          },
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        priceByNight: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "hotel",
        tableName: "hotels",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Profile, {
      through: models.ProfileHotel,
      foreignKey: "hotelId", // La clé étrangère dans la table ProfileHotel
      as: "profiles", // Alias pour accéder aux profils associés
    });
  }
}
