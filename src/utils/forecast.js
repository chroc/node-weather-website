const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = ('http://api.weatherstack.com/current?access_key=2e329d0dab328209a6b1bdbb4bc476e2&query='+ latitude +','+ longitude);
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to the weather service :(', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            const weatherDescription = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const humidity = body.current.humidity;
            const uvIndex = body.current.uv_index;
            console.log(body.current);
            const message = weatherDescription + ' .It is currently ' + temperature + '°C out. It feels like ' + feelsLike + '°C out. Humidity: ' + humidity + '%. UV index: ' + uvIndex;
            callback(undefined, message);
        }
    });
};

module.exports = forecast;