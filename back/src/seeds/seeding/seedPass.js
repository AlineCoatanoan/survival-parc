import { models } from '../../models/index.js';

const { Pass } = models;
export const seedPass = async () => {
  const pass = [
    {
      name: 'Ticket',
      description: 'entrée pour un jour',
      price: 20,
    },
    {
      name: 'Pass 2 jours',
      description: 'pass pour 2 jours',
      basePrice: 30,
    },
    {
      name: 'Pass 3 jours',
      description: 'entrée pour 3 jours',
      basePrice: 50,
    },
  ];
  for (const pass of pass) {
    try {
      await Pass.create(pass);
      console.log('Pass seeded ✅');
    } catch (error) {
      console.error('❌ Error seeding pass:', error);
    }
  }
};
