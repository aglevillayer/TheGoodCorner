import express from "express";
import {
  getAdsOrmType,
  getAdsOrmTypeById,
  getCategoriesOrmType,
  getAdsOrmTypeByCategory,
  getAdsAveragePriceOfLocation,
  postNewAdsOrmType,
  updateAdsOrmType,
  deleteAdsOrmType,
  deleteAdsOrmTypePriceMoreThan40,
} from "../controllers/adsOrmTypeRelationControllers";

const router = express.Router();

router.get("/ad", getAdsOrmType);
router.get("/ad/:id", getAdsOrmTypeById);
router.get("/category", getCategoriesOrmType);
router.get("/category/:categoryName", getAdsOrmTypeByCategory);
router.get("/avgPrice/:location", getAdsAveragePriceOfLocation);
router.post("/ad", postNewAdsOrmType);
router.put("/ad/:id", updateAdsOrmType);
router.delete("/ad/:id", deleteAdsOrmType);
router.delete("/price/:maxPrice", deleteAdsOrmTypePriceMoreThan40);

export default router;
