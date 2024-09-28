import { Model, DataTypes } from "sequelize";

export class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profileId: {
          type: DataTypes.INTEGER,
          references: {
            model: "profiles", // Assurez-vous que la table 'profiles' existe
            key: "id",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true,
      }
    );
  }
}

export default User; // Export par défaut
