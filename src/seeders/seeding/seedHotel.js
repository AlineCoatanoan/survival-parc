import { models } from "../../models/index.js";

const { Hotel } = models;

export const seedHotel = async () => {
  const hotels = [
    {
      name: "Hotel post-apocalyptique",
      description:
        "Découvrez l'Hôtel Post-Apocalyptique, un havre de paix en dehors des zones de quarantaine, où le confort rencontre l'aventure. Inspiré par un monde de survie, cet hôtel offre une atmosphère intrigante avec des chambres décorées de façon industrielle et des touches naturelles. Détendez-vous dans un cadre sécurisé tout en explorant les histoires de résilience qui vous entourent. Avec un restaurant servant des plats inspirés des ressources locales et des activités immersives, cet hôtel est le lieu idéal pour recharger vos batteries après une journée d'exploration du Survival-Parc.",
      address: "12 rue de la gare", // Correction ici
      postalCode: "75001",
      city: "Paris",
      priceByNight: 50, // Ajoutez le prix par nuit ici
    },
    {
      name: "Hotel le refuge des survivants",
      description:
        "Plongez dans l'univers captivant du Survival-Parc à l'Hôtel Zone Sécurisée, conçu pour offrir une refuge en pleine ambiance de quarantaine. Encadré par des murs de béton et des systèmes de sécurité avancés, cet hôtel garantit une expérience immersive tout en préservant votre confort. Chaque chambre, stylisée avec des éléments de sécurité inspirés de l'univers de la survie, offre un espace rassurant pour se reposer après vos aventures. Profitez d'une restauration adaptée à l'environnement et de services de sécurité pour une tranquillité d'esprit totale, le tout au cœur de la tension et de l'excitation d'une zone sous contrôle.",
      address: "12 rue de la gare", // Correction ici
      postalCode: "75001",
      city: "Paris",
      priceByNight: 30,
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
