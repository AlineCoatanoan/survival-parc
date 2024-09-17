import { DataTypes, Model } from 'sequelize';

export class Hotel extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        adress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [5, 10],
          },
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [2, 30],
          },
        },
        priceByNight: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            isNumeric: true,
            min: 0,
            max: 1000,
          },
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Hotel',
        tableName: 'hotels',
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
