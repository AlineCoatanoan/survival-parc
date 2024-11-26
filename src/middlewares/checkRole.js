export const checkRole = (requiredRole) => (req, res, next) => {
  if (!req.userRole || req.userRole !== requiredRole) {
    return res
      .status(403)
      .json({ message: "Access forbidden: insufficient privileges" });
  }
  next();
};
