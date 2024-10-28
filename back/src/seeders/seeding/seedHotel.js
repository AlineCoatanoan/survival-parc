import { models } from "../../models/index.js";

const { Hotel } = models;

export const seedHotel = async () => {
  const hotels = [
    {
      name: "Hotel le bunker",
      description:
        "Cet hôtel souterrain offre une expérience de survie réaliste avec des chambres aménagées dans un ancien bunker. Les visiteurs y trouveront un refuge sécurisé, avec des portes blindées et une ambiance post-apocalyptique, tout en bénéficiant de tout le confort moderne.",
      address: "12 rue de la gare", // Correction ici
      postalCode: "75001",
      city: "Paris",
      priceByNight: 50, // Ajoutez le prix par nuit ici
    },
    {
      name: "Hotel le refuge des survivants",
      description:
        "Situé en bordure de la zone de quarantaine, cet hôtel a été conçu comme un camp de réfugiés. Les chambres ressemblent à des cabines renforcées, et les visiteurs peuvent profiter d’espaces communs où des 'rations' sont servies dans une ambiance de camp de survie.",
      address: "12 rue de la gare", // Correction ici
      postalCode: "75001",
      city: "Paris",
      priceByNight: 30,
      photo: null,
    },
    {
      name: "Hotel de l'avant-poste",
      description:
        "Cet hôtel est conçu comme un avant-poste militaire en zone de crise. Les chambres sont aménagées pour ressembler à des unités de commandement, avec des équipements de survie intégrés et des décors inspirés des bases militaires. Les visiteurs peuvent également profiter de zones de détente avec des thèmes de stratégie et de sécurité.",
      address: "12 rue de la gare", // Correction ici
      postalCode: "75001",
      city: "Paris",
      priceByNight: 50,
      photo: null,
    },
  ];

  for (const hotel of hotels) {
    try {
      await Hotel.create(hotel);
      console.log("Hotel seeded ✅");
    } catch (error) {
      console.error("❌ Error seeding hotels:", error);
    }
  }
};
