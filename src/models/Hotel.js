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
    // Un hôtel peut avoir plusieurs réservations (via la table de liaison ProfileHotel)
    this.belongsToMany(models.Profile, {
      through: models.ProfileHotel,
      foreignKey: "hotelId",
      as: "profiles",
    });
  }
}
