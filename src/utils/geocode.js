const request = require('postman-request');

// Using the callback function
const geocode = (address, callback) => {
    //..
    const url = ('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2VyZ2lvcm9jNyIsImEiOiJjbDFyamhtbDkwaWJrM2NxcWpnN3k5M3ZhIn0.ACo7BRbqos6PMhWcGEWA9Q&limit=1');
    request({ url, json: true }, (error, { body }) => {
        //..
        if(error){
            callback('Unable to coonect to location services :(', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find geolocation. Try another search', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;