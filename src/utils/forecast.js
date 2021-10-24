const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=354612e62811db19ac5b7a35be5b805e&query=
  ${encodeURIComponent(lat)},${encodeURIComponent(long)}`;

  request(
    {
      url,
      json: true,
    },
    (error, res, { error: respErr, current }) => {
      if (error) {
        callback('Unable to connect weather stack!', undefined);
      } else if (respErr) {
        callback('Unable to get the location!', undefined);
      } else {
        const { weather_descriptions, temperature, feelslike } = current;
        callback(
          undefined,
          `⛅${weather_descriptions[0]}.It is currently ${temperature} degrees outside. But it feels like ${feelslike} degrees outside.`
        );
      }
    }
  );
};

module.exports = forecast;
