import { Router } from "express";
import * as hotelController from "../controllers/hotelController.js";
import { ctrlWrapper as cw } from "../utils/ctrlWrapper.js";

export const router = Router();

router.post("/", cw(hotelController.createHotel));
router.get("/", cw(hotelController.getAllHotels));
router.get("/:id", cw(hotelController.getHotelId));
router.put("/:id", cw(hotelController.updateHotel));
router.delete("/:id", cw(hotelController.deleteHotel));
