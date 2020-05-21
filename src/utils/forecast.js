const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5fc8c062b70aa73f3acea688b4d3f8fc&query=${lat},${long}&units=f`;
  request(
    { url, json: true },
    (
      err,
      {
        body: {
          error,
          current: {
            weather_descriptions,
            temperature,
            precip,
            feelslike,
            humidity,
          },
        },
      }
    ) => {
      if (err) {
        callback('Unable to connect to weather service', undefined);
      } else if (error) {
        callback('Unable to find location', undefined);
      } else {
        callback(
          undefined,
          `${
            weather_descriptions[0]
          }. It is currently ${temperature}\u00B0F, and it feels like ${feelslike}\u00B0F. The humidity is ${humidity}%, and there is ${
            precip * 100
          }% chance of rain.`
        );
      }
    }
  );
};

module.exports = forecast;
