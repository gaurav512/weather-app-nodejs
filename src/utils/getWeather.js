const request = require('request')

const getWeather = (location, callback) => {
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(location) + '&appid=40e424c3d86a901d693a3c89eaf4a447'
    request({url, json : true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable connect to the Weather service.', undefined);
        } 
        else if(!body.coord) {
            callback('Location not found. Please try again.', undefined);
        }
        else {
            forecast = `Weather summary: ${body.weather[0].description}<br>The current temperature is ${Math.round((body.main.temp - 273.15) * 100) / 100} degrees. It feels like ${Math.round((body.main.feels_like - 273.15) * 100)/100} degrees.`
            callback(undefined, {
                location: body.name + ', ' + body.sys.country,
                forecast: forecast
            });
        }
    })
}

module.exports = getWeather