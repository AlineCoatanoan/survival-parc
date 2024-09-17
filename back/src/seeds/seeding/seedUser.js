import { models } from '../../models/index.js';

const { User } = models;
export const seedUser = async () => {
  const users = [
    {
      email: 'aline@mail.com',
      role: 'admin',
      password: 'aline123Password!',
    },
    {
      email: 'alex@example.com',
      role: 'user',
      password: 'alexPassword123!',
    },
  ];

  for (const user of users) {
    try {
      await User.create(user);
      console.log('User seeded ✅');
    } catch (error) {
      console.error('❌ Error seeding users:', error);
    }
  }
};
