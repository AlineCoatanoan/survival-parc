// Fonction pour définir le cookie
export const setCookies = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Empêche l'accès au cookie via JavaScript
    secure: process.env.NODE_ENV === "production", // Utiliser le cookie sécurisé en production
    maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 3600000, // Durée de vie du cookie : 1h
    sameSite: "lax", // détermine la manière dont les cookies sont envoyés lors de requêtes effectuées vers un autre domaine
  });
};

// Fonction pour effacer le cookie
export const clearCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
