import { Router } from "express";
import { router as authRouter } from "./authRouter.js";
import { router as userRouter } from "./userRouter.js";
import { router as reservationRouter } from "./reservationRouter.js";
import { router as profileRouter } from "./profileRouter.js";
import { router as animationRouter } from "./animationRouter.js";
import { router as hotelRouter } from "./hotelRouter.js";
import { router as profilehotelRouter } from "./profilehotelRouter.js";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello putain de Survival World");
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/reservation", reservationRouter);
router.use("/profile", profileRouter);
router.use("/animations", animationRouter);
router.use("/hotel", hotelRouter);
router.use("/profilehotel", profilehotelRouter);
