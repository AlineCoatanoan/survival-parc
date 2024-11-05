import { models } from "../../models/index.js";

const { Animation } = models;

export const seedAnimation = async () => {
  const animations = [
    {
      name: "La Montée du Chaos",
      description: "Le grand 8",
      type: "attraction",
    },
    {
      name: "Le train-Zombie",
      description: "Un train qui se déplace dans une zone infectée du parc",
      type: "attraction",
    },
    {
      name: "De nombreuses attractions",
      description:
        "Découvrez des manèges palpitants, défiant vos sens et testant votre bravoure dans un univers captivant.",
      type: "attraction",
    },
    {
      name: "Le passage secret",
      description:
        "Un labyrinthe sombre où les visiteurs doivent utiliser des indices pour trouver leur chemin tout en évitant des obstacles et des créatures dangereuses.",
      type: "labyrinthe",
    },
    {
      name: "Le laboratoire",
      description:
        "Escape Game où il faudra trouver un vaccin avant que le virus ne se propage.",
      type: "escapeGame",
    },
    {
      name: "L'immersif 360°",
      description:
        "Cinéma 4DX avec des écrans du sol au plafond pour une immersion totale",
      type: "cinema",
    },
  ];
  for (const animation of animations) {
    try {
      await Animation.create(animation);
      console.log("Animation seeded ✅");
    } catch (error) {
      console.error("❌ Error seeding animations:", error);
    }
  }
};
