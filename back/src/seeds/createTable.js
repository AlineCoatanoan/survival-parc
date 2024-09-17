import { sequelize } from '../models/index.js';

const createTables = async () => {
  try {
    console.log('🚀 Creating tables...');
    await sequelize.sync({ force: true });
    console.log('✅ Tables created');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  } finally {
    await sequelize.close();
    console.log('👺 sequelize connection closed');
  }
};

createTables();
