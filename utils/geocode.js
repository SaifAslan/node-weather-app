const request = require("postman-request");

const geocode = (address, callback) => {
  const urlMB = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.mapbox_key}&limit=1`;
  let error = undefined;
  let data = undefined;
  request(urlMB, { json: true }, (err, res) => {
    if (err) {
      error = "Unable to connect to location service!";
    } else if (res.body.message || !res.body.features[0]) {
      error = "Unable to find location!";
    } else {
      const resData = res.body;
      const latitude = resData.features[0].center[1];
      const longitude = resData.features[0].center[0];
      const location = resData.features[0].place_name;
      data = { latitude, longitude, location };
    }
    callback(error, data);
  });
};

module.exports = geocode;
