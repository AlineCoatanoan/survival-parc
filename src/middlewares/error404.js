// middlewares/error404.js
const error404 = (res, message) => {
  res.status(404).json({ message: message || "Not Found" });
};

export { error404 };
