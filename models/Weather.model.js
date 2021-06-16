
class Weather {
    constructor(weatherDataInput) {
      this.description = weatherDataInput.weather.description;
      this.date = weatherDataInput.valid_date;
    }
  }
module.exports = Weather;