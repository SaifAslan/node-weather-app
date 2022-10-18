const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
require("dotenv").config();

const address = process.argv[2];

if (!address) {
  console.log("Please add address!");
} else {
  geocode(address, (error, {latitude,longitude, location}={}) => {
    if (error) {
      console.log("error", error);
      return;
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log("error", error);
        return;
      }
      console.log(location);
      console.log(forecastData);
    });
  });
}

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("error", error);
//   console.log("data", data);
// });
