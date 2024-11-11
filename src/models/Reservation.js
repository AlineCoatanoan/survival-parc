import { Model, DataTypes } from "sequelize";

export class Reservation extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        person: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        profileId: {
          type: DataTypes.INTEGER,
          references: {
            model: "profiles",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        hotelId: {
          type: DataTypes.INTEGER,
          allowNull: false, // Ajoute cette ligne si l'identifiant de l'hôtel est obligatoire
          references: {
            model: "hotels",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        hotelName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        passId: {
          type: DataTypes.INTEGER,
          references: {
            model: "passes", // Assurez-vous que la table 'passes' existe
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "reservation",
        tableName: "reservations",
        timestamps: true,
      }
    );
  }
}
