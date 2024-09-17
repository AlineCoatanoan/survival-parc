import { Attraction } from './Attraction.js';
import { Hotel } from './Hotel.js';
import { Pass } from './Pass.js';
import { Profile } from './Profile.js';
import { User } from './User.js';
import { Reservation } from './Reservation.js';

import { sequelize } from './dbclient.js';

// Initialisation des models
export const models = {
  User: User.init(sequelize),
  Profile: Profile.init(sequelize),
  Attraction: Attraction.init(sequelize),
  Hotel: Hotel.init(sequelize),
  Pass: Pass.init(sequelize),
  Reservation: Reservation.init(sequelize),
};

// Associations si elles existent
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

// Synchroniser les modèles avec la base de données
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

export { sequelize };
