import Joi from "joi";
import { badRequestResponse } from "../middlewares/errors.js"; // Assure-toi que cette fonction gère les erreurs correctement

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "format email invalide",
      "string.empty": "Email requis",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Le mot de passe doit comporter au moins 6 caractères",
      "string.empty": "Mot de passe requis",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return badRequestResponse(res, error.details[0].message); // Récupère et renvoie le premier message d'erreur
  }

  next(); // Passe au controller si la validation réussit
};

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      "string.empty": "Prénom requis",
    }),
    lastName: Joi.string().required().messages({
      "string.empty": "Nom requis",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "email format invalide",
      "string.empty": "Email requis",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Le mot de passe doit comporter au moins 6 caractères",
      "string.empty": "Mot de passe requis",
    }),
    role: Joi.string().valid("user", "admin").optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return badRequestResponse(res, error.details[0].message);
  }

  next();
};
