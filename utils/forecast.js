const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const urlWS = `http://api.weatherstack.com/current?access_key=${process.env.weather_stack}&query=${latitude},${longitude}`;
  let error = undefined;
  let data = undefined;
  request(urlWS, { json: true }, (err, res) => {
    debugger
    if (err) {
      error = "Unable to connect to weather service!";
    } else if (res.body.error) {
      error = "Unable to find location!";
    } else {
      const resData = res?.body;
      data = `${resData.current.weather_descriptions[0]}. It is currently ${resData.current.temperature}. It feels like ${resData.current.feelslike}.`;
    }
    callback(error, data);

  });
};

module.exports = forecast;