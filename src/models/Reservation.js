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
          allowNull: true, // Modifié ici pour rendre l'hôtel facultatif
          references: {
            model: "hotels",
            key: "id",
          },
          onDelete: "SET NULL", // Si l'hôtel est supprimé, l'hôtel de cette réservation devient NULL
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
