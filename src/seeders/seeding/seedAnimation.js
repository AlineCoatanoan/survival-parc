import { models } from "../../models/index.js";

const { Animation } = models;

export const seedAnimation = async () => {
  const animations = [
    {
      name: "La Montée du Chaos",
      description:
        "La montée du chaos est un grand huit spectaculaire où chaque instant vous plonge dans un tourbillon d'adrénaline. Dès le départ, vous serez propulsé à une hauteur vertigineuse, offrant une vue imprenable sur le parc. Mais ne vous laissez pas tromper par cette ascension tranquille, car une fois au sommet, le chaos commence : une chute libre soudaine et des virages serrés à grande vitesse.",
      type: "attraction",
    },
    {
      name: "Le train-Zombie",
      description:
        "Ce voyage à travers l'horreur vous emmène en-dehors de la zone de quarantaine. Le train roule lentement dans un tunnel obscur, la lumière vacille et, dans l'ombre, des zombies affamés surgissent des recoins sombres. Entre cris et frissons, seul le mouvement du train vous sauvera des griffes de ces monstres assoiffés de chair humaine.",
      type: "attraction",
    },
    {
      name: "De nombreuses attractions",
      description:
        "Survival Parc vous plonge dans un monde où l'adrénaline et la survie sont au cœur de chaque expérience. Préparez-vous à vivre des aventures où chaque attraction vous met à l’épreuve. La grande roue du désespoir, Les chaises volantes de l'évasion, la tour infernale... et de nombreuses autres attractions",
      type: "attraction",
    },
    {
      name: "Le passage secret",
      description:
        "Plongez dans un labyrinthe caché dans les ruines d’un hôpital psychiatrique abandonné. Ce lieu sinistre, envahi par la végétation, est un dédale de couloirs sombres et de murs recouverts de lierre. Au centre, une cour intérieure abrite un labyrinthe où l’obscurité et la brume jouent avec vos sens. Trouvez la sortie avant que la panique ne prenne le dessus.",
      type: "labyrinthe",
    },
    {
      name: "Le laboratoire",
      description:
        "Dans Le Laboratoire, le temps est compté. Vous êtes enfermés dans un centre de recherche où une épidémie mortelle se propage à une vitesse alarmante. Votre mission : trouver un vaccin avant que le virus ne vous atteigne. Chaque seconde compte, et l’issue de votre équipe dépend de votre ingéniosité",
      type: "escapeGame",
    },
    {
      name: "L'immersif 360°",
      description:
        "Plongez au cœur de l'action avec L'Immersif 360°, un cinéma 3D 4DX qui vous offre une expérience sensorielle inédite. Les écrans couvrent tout votre champ de vision, du sol au plafond, vous entourant d'images saisissantes. Préparez-vous à vivre des émotions fortes dans un décor d'une immersion totale !",
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
