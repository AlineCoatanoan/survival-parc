import { Router } from "express";
import * as reservationController from "../controllers/reservationController.js";
import { ctrlWrapper as cw } from "../../utils/ctrlWrapper.js";

export const router = Router();

router.get("/", cw(reservationController.getAllReservations));
router.get("/:id", cw(reservationController.getReservationsByUser));
router.post("/", cw(reservationController.createReservation));
router.put("/:id", cw(reservationController.updateReservation));
router.delete("/:id", cw(reservationController.deleteReservation));
