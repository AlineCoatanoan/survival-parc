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
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        nights: {
          type: DataTypes.INTEGER,
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
      },
      {
        sequelize, // Utilisation de l'import
        modelName: "reservation", // Nom du modèle en minuscule
        tableName: "reservations", // Nom de la table
        timestamps: true,
      }
    );
  }
}

export default Reservation; // Ajout d'un export par défaut
