import express from "express";
import {
  getAdsOrmType,
  getAdsOrmTypeById,
  postNewAdsOrmType,
  updateAdsOrmType,
  deleteAdsOrmType,
} from "../controllers/adsOrmTypeControllers";

const router = express.Router();

router.get("/", getAdsOrmType);
router.get("/:id", getAdsOrmTypeById);
router.post("/", postNewAdsOrmType);
router.put("/:id", updateAdsOrmType);
router.delete("/:id", deleteAdsOrmType);

export default router;
