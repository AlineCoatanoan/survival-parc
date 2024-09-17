import { Router } from "express";
import { router as authRouter } from "./authRouter.js";
import { router as userRouter } from "./userRouter.js";
import { router as reservationRouter } from "./reservationRouter.js";
import { router as profileRouter } from "./profileRouter.js";
import { router as attractionRouter } from "./attractionRouter.js";
import { router as hotelRouter } from "./hotelRouter.js";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello putain de Survival World");
});

router.use("/api", authRouter);
router.use("/api", userRouter);
router.use("/api", reservationRouter);
router.use("/api", profileRouter);
router.use("/api", attractionRouter);
router.use("/api", hotelRouter);
