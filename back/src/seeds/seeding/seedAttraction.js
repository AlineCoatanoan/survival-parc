import { models } from '../../models/index.js';

const { Attraction } = models;

export const seedAttraction = async () => {
  const attractions = [
    {
      name: 'La Montée du Chaos',
      description: 'Le grand 8',
      type: 'attraction',
      photo: null,
    },
    {
      name: 'Le passage secret',
      description:
        'Un labyrinthe sombre où les visiteurs doivent utiliser des indices pour trouver leur chemin tout en évitant des obstacles et des créatures dangereuses.',
      photo: null,
    },
    {
      name: 'Le laboratoire',
      description:
        'Escape Game où il faudra trouver un vaccin avant que le virus ne se propage.',
      photo: null,
    },
    {
      name: "L'immersif 360°",
      description:
        'Cinéma 4DX avec des écrans du sol au plafond pour une immersion totale',
      photo: null,
    },
  ];
  for (const attraction of attractions) {
    try {
      await Attraction.create(attraction);
      console.log('Attraction seeded ✅');
    } catch (error) {
      console.error('❌ Error seeding attractions:', error);
    }
  }
};
