import { Router } from "express";
import {
  currentWeather,
  fiveDailyForecast,
} from "../controllers/weatherController";

const router = Router();

router.route("/:cityKey").get(currentWeather);
router.route("/fiveDaily/:cityKey").get(fiveDailyForecast);

export default router;
