import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { ctrlWrapper as cw } from "../utils/ctrlWrapper.js";

export const router = Router();

router.post("/user", cw(userController.createUser));
router.get("/user", cw(userController.getUser));
router.put("/user/:id", cw(userController.updateUser));
router.delete("/user/:id", cw(userController.deleteUser));
