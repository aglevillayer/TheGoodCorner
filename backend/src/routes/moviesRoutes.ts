import express from "express";
import {
  getAllMovies,
  getMoviesCount,
  getMoviesTotalBudget,
} from "../controllers/moviesControllers";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/count", getMoviesCount);
router.get("/totalBudget", getMoviesTotalBudget);
//router.get("/", getMoviesWithMinYearOrRequestedTime);
//router.post("/", postMovie);
//router.put("/", updateMovie);
//router.delete("/", deleteMovies);

export default router;
