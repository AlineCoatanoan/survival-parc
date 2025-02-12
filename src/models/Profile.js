import { Model, DataTypes } from "sequelize";

export class Profile extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: "users",
            key: "id",
          },
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [2, 30],
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [2, 30],
          },
        },
        birthDate: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
            isBefore: new Date().toISOString(),
          },
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "profile",
        tableName: "profiles",
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Hotel, {
      through: models.ProfileHotel,
      foreignKey: "profileId", // Le nom de la clé étrangère dans ProfileHotel
      as: "hotels", // Alias pour accéder aux hôtels associés
    });
  }
}
