import express from "express";
import {
  getAdsOrmType,
  getAdsOrmTypeById,
  getAdsOrmTypeByCategory,
  getAdsAveragePriceOfLocation,
  postNewAdsOrmType,
  updateAdsOrmType,
  deleteAdsOrmType,
  deleteAdsOrmTypePriceMoreThan40,
} from "../controllers/adsOrmTypeRelationControllers";

const router = express.Router();

router.get("/", getAdsOrmType);
router.get("/:id", getAdsOrmTypeById);
router.get("/category/:categoryName", getAdsOrmTypeByCategory);
router.get("/avgPrice/:location", getAdsAveragePriceOfLocation);
router.post("/", postNewAdsOrmType);
router.put("/:id", updateAdsOrmType);
router.delete("/:id", deleteAdsOrmType);
router.delete("/price/:maxPrice", deleteAdsOrmTypePriceMoreThan40);

export default router;
