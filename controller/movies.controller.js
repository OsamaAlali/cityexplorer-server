

Movie = require ('../models/Movies.model')
const axios = require("axios");
require("dotenv").config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const Cache=require('../helper/cache')

const movieObj= new Cache();

const moviesController =   (req, res) => {

    const cityName = req.query.query;
   const requsetKey=`move-${cityName}`;

     if (movieObj[requsetKey] && (Date.now() - movieObj[requsetKey].timestamp < 86400000) ) {
      console.log("From the cache Object");

      res.json(movieObj[requsetKey].results);
     } else { 
       
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=1f872c37d43c6273347f464702a0ead7&query=${cityName}`;
    // console.log("MovieURL", movieUrl);
    axios.get(movieUrl).then((response) => {
      const responsDataMovie = response.data.results.map((vote) => { 
        return new Movie(vote);
      });
      console.log("responsDataMovie", responsDataMovie);
console.log('MOvieee');
console.log("Store data in cache");
          movieObj[requsetKey] = {results: responsDataMovie}
          console.log('moooooooooooooo',movieObj);
          movieObj[requsetKey].timestamp = Date.now();
          console.log("stord");
      res.json(responsDataMovie);
    })  
    .catch((error) => {
      res.status(500).send(error);
      console.log(error.message);
    });
  }

  }
  module.exports = moviesController ;