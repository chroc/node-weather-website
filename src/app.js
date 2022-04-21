const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Setup habndlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// console.log(__dirname);
// console.log(__filename);

// app.com
// app.com/help
// app.com/about
// app.com/weather

// no longer used since app.use goes and find index.html
// app.get('', (req, res) => {
//     //..
//     res.send('<h1>Weather App</h1>');
// });

// no longer used
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Sergio',
//         age: 34
//     });
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About us...</h1>');
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sergio Rojas'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sergio Rojas'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Here you will find the help you need',
        name: 'Sergio Rojas'
    });
});

// address query
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }
    // Mapbox request call
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // handle error
        if(error){
            return res.send({
                error: error
            });
        }
        // Weatherstack request call
        forecast(latitude, longitude, (error, forecastData) => {
            // handle error
            if(error){
                return res.send({
                    error: error
                });
            }
            // return succesfull response
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

// Testing...
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404: Help article not found :/',
        name: 'Sergio Rojas'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404: Page not found :/',
        name: 'Sergio Rojas'
    });
});

// Start the server on port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});