import { sequelize } from "../config/dbclient.js";
import { seedAnimation } from "./seeding/seedAnimation.js";
import { seedHotel } from "./seeding/seedHotel.js";
import { seedProfile } from "./seeding/seedProfile.js";
import { seedReservation } from "./seeding/seedReservation.js";
import { seedUser } from "./seeding/seedUser.js";

const populateTable = async () => {
  try {
    console.log("🚀 Populating tables...");
    await seedUser();
    await seedProfile();
    await seedHotel();
    await seedReservation();
    await seedAnimation();
    console.log("✅ Tables populated successfully!");
  } catch (error) {
    console.error("❌ Error populating tables:", error);
  } finally {
    await sequelize.close();
  }
};

populateTable();
