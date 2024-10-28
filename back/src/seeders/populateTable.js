import { sequelize } from "../models/dbclient.js";
import { seedAttraction } from "./seeding/seedAttraction.js";
import { seedHotel } from "./seeding/seedHotel.js";
import { seedPass } from "./seeding/seedPass.js";
import { seedProfile } from "./seeding/seedProfile.js";
import { seedReservation } from "./seeding/seedReservation.js";
import { seedUser } from "./seeding/seedUser.js";

const populateTable = async () => {
  try {
    console.log("🚀 Populating tables...");
    await seedUser(); // 1. Insérer utilisateurs
    await seedProfile(); // 2. Insérer profils qui dépendent des utilisateurs
    await seedHotel(); // 3. Insérer hôtels
    await seedPass(); // 4. Insérer pass
    await seedReservation(); // 5. Insérer réservations qui dépendent des profils, hôtels et pass
    await seedAttraction(); // 6. Insérer attractions (indépendant)
    console.log("✅ Tables populated successfully!");
  } catch (error) {
    console.error("❌ Error populating tables:", error);
  } finally {
    await sequelize.close();
  }
};

populateTable();
