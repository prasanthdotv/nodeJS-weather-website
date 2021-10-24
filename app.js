const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');

const app = express();

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
    message: 'Web page to show weather forecast of specified location',
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
