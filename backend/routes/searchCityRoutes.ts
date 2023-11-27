import { Router } from "express";
import {
  getCity,
  getCityByGeoLocation,
} from "../controllers/searchCityController";

const router = Router();

router.route("/:cityName").get(getCity);
router.route("/byGeo/:lat/:lon").get(getCityByGeoLocation);

export default router;
