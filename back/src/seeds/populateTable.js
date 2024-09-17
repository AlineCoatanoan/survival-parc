import { sequelize } from '../models/dbclient.js';
import { seedAttraction } from './seeding/seedAttraction.js';
import { seedHotel } from './seeding/seedHotel.js';
import { seedPass } from './seeding/seedPass.js';
import { seedProfile } from './seeding/seedProfile.js';
import { seedReservation } from './seeding/seedReservation.js';
import { seedUser } from './seeding/seedUser.js';

const populateTable = async () => {
  try {
    console.log('🚀 Populating tables...');
    await seedAttraction();
    await seedHotel();
    await seedPass();
    await seedProfile();
    await seedReservation();
    await seedUser();
  } catch (error) {
    console.error('❌ Error populating tables:', error);
  } finally {
    await sequelize.close();
    console.log('✅ Tables populated successfully!');
  }
};

populateTable();
