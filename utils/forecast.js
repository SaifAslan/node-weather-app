const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const urlWS = `http://api.weatherstack.com/current?access_key=${process.env.weather_stack}&query=${latitude},${longitude}`;
  let error = undefined;
  let data = undefined;
  request(urlWS, { json: true }, (err, { body }) => {
    debugger;
    if (err) {
      error = "Unable to connect to weather service!";
    } else if (body.error) {
      error = "Unable to find location!";
    } else {
      data = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}. It feels like ${body.current.feelslike}.`;
    }
    callback(error, data);
  });
};

module.exports = forecast;
