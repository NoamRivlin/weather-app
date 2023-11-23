import { Router } from "express";
import {
  currentWeather,
  fiveDailyWeather,
} from "../controllers/weatherController";

const router = Router();

router.route("/:cityKey").get(currentWeather);
router.route("/fiveDaily/:cityKey").get(fiveDailyWeather);

export default router;
