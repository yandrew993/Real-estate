import express from "express";
import {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getHotels);
router.get("/:id", verifyToken, getHotel);
router.post("/", verifyToken, createHotel);
router.put("/:id", verifyToken, updateHotel);
router.delete("/:id", verifyToken, deleteHotel);

export default router;
