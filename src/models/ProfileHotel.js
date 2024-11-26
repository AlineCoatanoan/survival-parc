import { Model, DataTypes } from "sequelize";

export class ProfileHotel extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        startDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
        endDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            isDate: true,
            isAfterStartDate(value) {
              if (this.startDate && value <= this.startDate) {
                throw new Error("End date must be after start date.");
              }
            },
          },
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "pending",
          validate: {
            isIn: [["pending", "confirmed", "cancelled"]],
          },
        },
      },
      {
        sequelize,
        modelName: "ProfileHotel",
        tableName: "profile_hotels",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    // Relations avec Profile et Hotel
    this.belongsTo(models.Profile, {
      foreignKey: "profileId",
      onDelete: "CASCADE", // Optionnel: permet de supprimer les associations si un profil est supprimé
    });
    this.belongsTo(models.Hotel, {
      foreignKey: "hotelId",
      onDelete: "CASCADE", // Optionnel: permet de supprimer les associations si un hôtel est supprimé
    });
  }
}
