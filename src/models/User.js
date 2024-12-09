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
          validate: {
            len: [2, 30], // Validation de longueur
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false, // Champ requis
          validate: {
            len: [2, 30], // Validation de longueur
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("admin", "user"), // Enum pour le rôle
          defaultValue: "user", // Rôle par défaut
          allowNull: false,
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
