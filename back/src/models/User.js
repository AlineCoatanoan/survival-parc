import { DataTypes, Model } from 'sequelize';

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
        mail: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [12, 30],
          },
        },
        role: {
          type: DataTypes.ENUM('admin', 'user'),
          allowNull: false,
        },
        profileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Profile, {
      foreignKey: 'profileId',
      onDelete: 'CASCADE',
      as: 'profile',
    });
  }
}
