import { Model, DataTypes } from "sequelize";

export class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false, // Champ requis
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false, // Champ requis
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false, // Champ requis
          unique: true, // Doit être unique
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false, // Champ requis
        },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true, // Pour créer createdAt et updatedAt
      }
    );
  }
}
