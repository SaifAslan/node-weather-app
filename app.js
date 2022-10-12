const request = require("postman-request");
const chalk = require("chalk");
const url =
  "http://api.weatherstack.com/current?access_key=e482a6533ca1f3278064712ef2a7b7ff&query=37.8267,-122.4233";

request(url, { json: true }, (err, res) => {
  if (err) {
    console.log(err.errno);
  } else {
    const data = res?.body;
    if (data.success === false) {
      console.log(chalk.red.inverse("error happened try again later"));
    } else {
      console.log(
        `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature}. It feels like ${data.current.feelslike}.`
      );
    }
  }
});
