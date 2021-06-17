Weather = require("../models/Weather.model");
const axios = require("axios");
require("dotenv").config();
const weatherData = require("../assets/weather.json");

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const Cache = require("../helper/cache");

const cacheObj = new Cache();

const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const requestKey = `weather-${lat}-${lon}`;
  
  if (lat && lon) {

    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {


      console.log("From the cache Object");

      res.json(cacheObj[requestKey].data);

    } else {
      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
      // console.log("weatherBitUrl", weatherBitUrl);
      axios
        .get(weatherBitUrl)
        .then((response) => {
          console.log("response.data.data", response.data.data);
          const responseData = response.data.data.map(
            (obj) => new Weather(obj)
          );
          console.log("From the axios request");
          console.log("=====================");
          console.log("Storing the data from the request into our cache");
              
          
             
              cacheObj[requestKey]= {data: responseData};
              console.log(cacheObj[requestKey]);
           
              cacheObj[requestKey].timestamp = Date.now();
              
          res.status(200).json(responseData);
        })
        .catch((error) => {
          res.status(500).send(error);
          console.log(error.message);
        });
      }
  } else {
    res.status(200).json(weatherData);
  }
};

module.exports = weatherController;
