export default {
  testEnvironment: "node", // Utilisation de l'environnement Node.js pour les tests
  transform: {
    "^.+\\.js$": "babel-jest", // Utiliser babel-jest pour transformer les fichiers .js
  },
};
