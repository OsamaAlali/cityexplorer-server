

Movie = require ('../models/Movies.model')
const axios = require("axios");
require("dotenv").config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;



const moviesController =   (req, res) => {
    const cityName = req.query.query;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=1f872c37d43c6273347f464702a0ead7&query=${cityName}`;
    console.log("MovieURL", movieUrl);
    axios.get(movieUrl).then((response) => {
      const responsDataMovie = response.data.results.map((vote) => { 
        return new Movie(vote);
      });
      console.log("responsDataMovie", responsDataMovie);
      res.json(responsDataMovie);
    });
  }
  module.exports = moviesController ;