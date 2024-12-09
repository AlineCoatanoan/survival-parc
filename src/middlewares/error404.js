// erreur 404 : ressource non trouvée
const error404 = (req, res, message) => {
  res.status(404).json({ message: message || "Not Found" });
};

export { error404 };
