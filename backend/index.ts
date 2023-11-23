import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchCityRoutes from "./routes/searchCityRoutes";
import weatherRoutes from "./routes/weatherRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cities", searchCityRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
