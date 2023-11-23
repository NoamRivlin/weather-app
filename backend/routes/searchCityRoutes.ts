import { Router } from "express";
import { getCity } from "../controllers/searchCityController";

const router = Router();

router.route("/:city").get(getCity);

export default router;
