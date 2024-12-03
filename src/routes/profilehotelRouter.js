import { Router } from "express";
import * as profilehotelController from "../controllers/profilehotelController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

router.post("/:profileId", cw(profilehotelController.createReservationHotel));
router.put("/:profileId", cw(profilehotelController.updateReservationHotel));
router.get("/", cw(profilehotelController.getAllReservationsHotels));
router.delete("/:id", cw(profilehotelController.deleteReservationHotel));
router.get(
  "/:profileId",
  cw(profilehotelController.getReservationAllHotelsById)
);
