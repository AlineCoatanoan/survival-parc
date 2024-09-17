import { DataTypes, Model } from 'sequelize';

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
        sequelize,
        modelName: 'Reservation',
        tableName: 'reservations',
        timestamps: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Profile, {
      foreignKey: 'profileId',
      as: 'profile',
    });

    this.hasMany(models.Hotel, {
      foreignKey: 'hotelId',
      as: 'hotels',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.Pass, {
      foreignKey: 'passId',
      as: 'pass',
      onDelete: 'CASCADE',
    });
  }
}
