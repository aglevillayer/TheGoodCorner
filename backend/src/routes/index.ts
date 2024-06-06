import express from "express";
import moviesRoutes from "./moviesRoutes";
import adsSQLRoutes from "./adsSQLRoutes";
import adsCategoryRoutes from "./adsCategoryRoutes";
import ormTypeRoutes from "./ormTypeRoutes";
import ormTypeRelationRoutes from "./ormTypeRelationRoutes";

const router = express.Router();

router.get("/", (req, res) =>
  res.send("Welcome in my world ! What are you looking for ? Can I help you ?")
);
router.use("/movies", moviesRoutes);
router.use("/adsSQL", adsSQLRoutes);
router.use("/adsCategory", adsCategoryRoutes);
router.use("/ormType", ormTypeRoutes);
router.use("/", ormTypeRelationRoutes);

export default router;
