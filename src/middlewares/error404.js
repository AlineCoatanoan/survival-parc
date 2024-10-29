const error404 = (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
};

export { error404 }; // Vérifiez que l'export est correct
