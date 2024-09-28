import { Model, DataTypes } from "sequelize";

export class Pass extends Model {
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
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "pass", // Nom du modèle en minuscule
        tableName: "passes", // Assurez-vous que le nom de la table est correct
        timestamps: true,
      }
    );
  }
}

export default Pass; // Export par défaut
