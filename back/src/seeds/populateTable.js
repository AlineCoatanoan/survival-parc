import { sequelize } from "../models/dbclient.js";
import { seedAttraction } from "./seeding/seedAttraction.js";
import { seedHotel } from "./seeding/seedHotel.js";
import { seedPass } from "./seeding/seedPass.js";
import { seedProfile } from "./seeding/seedProfile.js";
import { seedReservation } from "./seeding/seedReservation.js";
import { seedUser } from "./seeding/seedUser.js";

const populateTable = async () => {
  const transaction = await sequelize.transaction();
  try {
    console.log("🚀 Populating tables...");
    await seedUser({ transaction }); // 1. Insérer utilisateurs
    await seedProfile({ transaction }); // 2. Insérer profils qui dépendent des utilisateurs
    await seedHotel({ transaction }); // 3. Insérer hôtels
    await seedPass({ transaction }); // 4. Insérer pass
    await seedReservation({ transaction }); // 5. Insérer réservations qui dépendent des profils, hôtels et pass
    await seedAttraction({ transaction }); // 6. Insérer attractions (indépendant)
    await transaction.commit();
    console.log("✅ Tables populated successfully!");
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error populating tables:", error);
  } finally {
    await sequelize.close();
  }
};

populateTable();
