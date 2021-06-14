const express = require('express') // require the express package
const app = express() // initialize your express app instance
 
const data = require('./assets/weather.json');

require('dotenv').config();
 const PORT=process.env.PORT;

const cors = require('cors');

app.use(cors()) // after you initialize your express app instance



// a server endpoint 







app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})
 
app.get('/osama', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Welecom Osama') // our endpoint function response
})

app.get('/weather-data',(req,response) =>{
response.json(data)

});
 
app.listen(PORT,() => {
console.log(`Server start on ${PORT}`);
});


// app.listen(3000) // kick start the express server to work