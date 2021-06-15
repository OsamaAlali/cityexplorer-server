const express = require("express"); // require the express package
const app = express(); // initialize your express app instance

const weatherData = require("./assets/weather.json");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const cors = require("cors");

app.use(cors()); // after you initialize your express app instance

// a server endpoint

app.get(
  "/", // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send("Hello World"); // our endpoint function response
  }
);

app.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    console.log('weatherBitUrl',weatherBitUrl);
    axios
      .get(weatherBitUrl)
      .then((response) => {
        console.log('response.data.data',response.data.data);
        const responseData = response.data.data.map((obj) => new Weather(obj));
        res.status(200).json(responseData);
      })
      .catch((error) => {
        res.status(500).send(error)
      });
  } else {
    
    res.status(200).json(weatherData); 

  }
});
//Modling the data
class Weather {
  constructor(weatherDataInput) {
    this.description = weatherDataInput.weather.description;
    this.date = weatherDataInput.valid_date;
  }
}

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});

// app.listen(3000) // kick start the express server to work
