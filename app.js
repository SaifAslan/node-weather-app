const request = require("postman-request");
const chalk = require("chalk");
require("dotenv").config();

const urlWS = `http://api.weatherstack.com/current?access_key=${process.env.weather_stack}&query=37.8267,-122.4233`;

request(urlWS, { json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect to weather service!");
  } else if (res.body.error) {
    console.log(chalk.red.inverse("Unable to find location!"));
  } else {
    const data = res?.body;
    console.log(
      `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature}. It feels like ${data.current.feelslike}.`
    );
  }
});

const urlMB = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.mapbox_key}&limit=1`;

request(urlMB, { json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect to location service!");
  } else if (res.body.message || !res.body.features[0]) {
    console.log(chalk.red.inverse("Unable to find location!"));
  } else {
    const data = res.body;
    console.log(`${data.features[0]?.text}`);
  }
});
