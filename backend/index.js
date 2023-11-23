const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(".env");
const API_KEY = process.env.API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/cities/:city", async (req, res) => {
  try {
    const response = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${req.params.city}`
    );
    console.log("response", response.data);
    const cities = response.data.map((city) => ({
      label: city.LocalizedName,
      value: city.Key,
    }));
    res.json(cities);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
