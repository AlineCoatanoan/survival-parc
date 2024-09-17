import { Router } from "express";
import * as attractionController from "../controllers/attractionController.js";
import { ctrlWrapper as cw } from "../utils/ctrlWrapper.js";

export const router = Router();

router.post("/", cw(attractionController.createAttraction));
router.get("/", cw(attractionController.getAllAttractions));
router.get("/search", cw(attractionController.searchAttraction));
router.get("/:id", cw(attractionController.getAttractionId));
router.put("/:id", cw(attractionController.updateAttraction));
router.delete("/:id", cw(attractionController.deleteAttraction));
