const request = require('postman-request');

// request({ url: url, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to the weather service :(');
//     }else if(response.body.error){
//         console.log('Unable to find location :(');
//     }else{
//         // convert the Json response
//         // const data = JSON.parse(response.body); // since we add the json:true parameter
//         // is no longer necesary to parse it to an object
//         // console.log(response.body.current);
//         const weatherDescription = response.body.current.weather_descriptions[0];
//         const temperature = response.body.current.temperature;
//         const feelsLike = response.body.current.feelslike;
//         console.log(weatherDescription + ' .It is currently ' + temperature + ' degress out. It feels like ' + feelsLike + ' degress out.');
//     }
// });

const forecast = (latitude, longitude, callback) => {
    //..
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
            const message = weatherDescription + ' .It is currently ' + temperature + ' degress out. It feels like ' + feelsLike + ' degress out.';
            callback(undefined, message);
        }
    });
};

module.exports = forecast;