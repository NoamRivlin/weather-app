import { Router } from "express";
import { getCity } from "../controllers/searchCityController";

const router = Router();

router.route("/:cityName").get(getCity);

export default router;
