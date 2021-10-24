const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, './templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, './templates/partials'));

app.use(express.static(path.join(__dirname, './public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    message: 'Get current Weather status',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.status(404).send({
      error: 'Location required',
    });
  }
  geocode(req.query.location, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.status(404).send({
        title: 'Error',
        error,
      });
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.status(404).send({
          title: 'Error',
          error,
        });
      }
      return res.send({
        title: 'Weather at ' + location,
        message: forecast,
      });
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    message:
      'This is a web page created by Prasanth Venugopalan. It will give the current weather forcast of given location. It uses APIs from mapbox and weatherstack.',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'How can I help you?',
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Oops!!!',
    message: 'Help article not found...',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Oops!!!',
    message: '404 Page Not Found.',
  });
});

app.listen(port, () => {
  console.log('Server running on port 3000');
});
