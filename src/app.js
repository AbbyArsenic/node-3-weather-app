// Server-side js file - communicates with APIs and database
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Call express function to create a new express app
const app = express();

// Port environment variable from heroku, OR local 3000
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve up absolute path to public directory
app.use(express.static(publicDirectoryPath));

// Configure server using methods on app
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'ARSENECA',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About the author',
    name: 'ARSENECA',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help & FAQs',
    name: 'ARSENECA',
    helpText: 'This is some really useful text',
  });
});

app.get('/weather', (req, res) => {
  !req.query.address
    ? res.send({ error: 'You must provide a search term' })
    : geocode(
        // Pass "address" through search param
        req.query.address,
        // Callback gets (err, {destructured res}) arguments
        (err, { latitude, longitude, location } = {}) => {
          err // Run forecast passing data from geocode
            ? res.send({ error: err })
            : forecast(latitude, longitude, (err, forecastData) => {
                err // !error? send data from geo and forecast
                  ? res.send({ Error: err })
                  : res.send({
                      address: `${req.query.address}`,
                      location,
                      latitude,
                      longitude,
                      forecast: forecastData,
                    });
              });
        }
      );
});

app.get('/products', (req, res) => {
  !req.query.search
    ? res.send({ error: 'You must provide a search term' })
    : res.send({ products: [`${req.query.search}`] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error: 404',
    name: 'ARSENECA',
    notFound: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error: 404',
    name: 'ARSENECA',
    notFound: 'The page you requested does not exist',
  });
});

// Start server
app.listen(port, () => console.log(`Server is up on port ${port}`));
