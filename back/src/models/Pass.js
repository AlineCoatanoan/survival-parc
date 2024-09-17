import { Model, DataTypes } from 'sequelize';

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
        Price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Pass',
        tableName: 'pass',
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Reservation, {
      foreignKey: 'reservationId',
      as: 'reservations',
      onDelete: 'CASCADE',
    });
  }
}
