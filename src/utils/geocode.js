const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHJhc2FudGhrYXJpdmVldHRpbCIsImEiOiJja3V1cm9vN2sxYW1nMm9vMnhlaW1uNWhhIn0.CZ56CkvN9c6iLoU0SQ8ubA`;
  request(
    {
      url,
      json: true,
    },
    (error, res, { features }) => {
      if (error) {
        callback('Unable to connect map box!', undefined);
      } else if (!features.length) {
        callback('Unable to get the location cordinates!', undefined);
      } else {
        const { place_name, center } = features[0];
        callback(undefined, {
          location: place_name,
          latitude: center[1],
          longitude: center[0],
        });
      }
    }
  );
};

module.exports = geocode;
