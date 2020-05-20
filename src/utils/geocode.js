const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWJieWFyc2VuaWMiLCJhIjoiY2thM2xxa3J3MHFpNTNvbWV3dGh4Z2gyMCJ9.Cu2mdylaU7Og4Ygodw4E7w&limit=1`;

  request({ url, json: true }, (err, { body: { features } = {} } = {}) => {
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (features.length < 1) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
