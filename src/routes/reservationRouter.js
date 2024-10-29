import { Router } from "express";
import * as reservationController from "../controllers/reservationController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

router.post("/reservation", cw(reservationController.createReservation));
router.get("/reservation", cw(reservationController.getReservation));
router.put("/reservation/:id", cw(reservationController.updateReservation));
router.delete("/reservation/:id", cw(reservationController.deleteReservation));
