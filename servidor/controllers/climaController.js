const axios = require('axios')

class WeatherController {
  static async getWeather(req, res) {
    const KEY_OPENWEATHERMAP = process.env.KEY_OPENWEATHERMAP || '';
    const city = 'Porlamar'; 
    const countryCode = 'VE';

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${KEY_OPENWEATHERMAP}&units=metric`);
      const data =  response.data;
      res.json(data);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = WeatherController;
