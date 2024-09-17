//  utilisé pour gérer les erreurs dans les contrôleurs Express de manière plus élégante.
//Il s'agit d'un "wrapper" ou d'un "enveloppeur" autour de tes fonctions de contrôleur pour capturer et
//gérer les erreurs de manière centralisée. Cela simplifie la gestion des erreurs et réduit la duplication
//du code de gestion des erreurs dans chaque contrôleur

export const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
    }
  };
};
