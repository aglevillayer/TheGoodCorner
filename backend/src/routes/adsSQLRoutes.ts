import express from "express";
import {
  getAllAdsSql,
  getAdsSqlLocation,
  deleteAdsSqlPrice,
  putAdsSqlPriceOnDate,
  getAdsSqlAvgPriceOnLocation,
  postNewAdsSql,
  getAdsSqlAvgPriceByLocation,
} from "../controllers/adsSQLControllers";

const router = express.Router();
router.get("/", getAllAdsSql);
router.get("/location/:id", getAdsSqlLocation);
router.delete("/price/:id", deleteAdsSqlPrice);
router.put("/price", putAdsSqlPriceOnDate);
router.get("/avgPrice/:location", getAdsSqlAvgPriceOnLocation);
router.post("/", postNewAdsSql);
router.get("/avgPrice", getAdsSqlAvgPriceByLocation);

export default router;
