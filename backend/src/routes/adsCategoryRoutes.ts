import express, { Request, Response } from "express";
import {
  getAdsByCategoryName,
  getAdsCategoryIds,
  getAvgPriceForCategory,
  getAdsCategoryByLetter,
  postNewAdAndCreateCategory,
} from "../controllers/adsCategoryControllers";

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome on the road adsCategory");
});
router.get("/category/:categoryName", getAdsByCategoryName);
router.post("/category", getAdsCategoryIds);
router.get("/avgPrice/:categoryName", getAvgPriceForCategory);
router.get("/categoryLetter/:letter", getAdsCategoryByLetter);
router.post("/", postNewAdAndCreateCategory);

export default router;
