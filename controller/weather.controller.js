
Weather =require ('../models/Weather.model')
const axios = require("axios");
require("dotenv").config();
const weatherData = require("../assets/weather.json");

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weatherController = (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
  
    if (lat && lon) {
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
      console.log("weatherBitUrl", weatherBitUrl);
      axios
        .get(weatherBitUrl)
        .then((response) => {
          console.log("response.data.data", response.data.data);
          const responseData = response.data.data.map((obj) => new Weather(obj));
          res.status(200).json(responseData);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } else {
      res.status(200).json(weatherData);
    }
  };

  module.exports = weatherController ;