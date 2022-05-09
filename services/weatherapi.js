const https = require('https');
require('dotenv').config();
let WeatherApi = () => { }

WeatherApi.getWeatherCurrentByCity = (params) => {
    return new Promise((resolve, reject) => {
        
        let ciudad = params.city;
        https
            .get(`${process.env.OPENWEATHERMAP}/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${process.env.APPID_WEATHER}`, function (resp) {

                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });


                resp.on('end', () => {
                    resolve(data);
                });
            })
            .on('error', function (err) {
                reject("ocurrio un error al acceder al servicio del clima por nombre de ciudad");
            });
    });
}

WeatherApi.getWeatherCurrentByIp = (params) => {
    return new Promise((resolve, reject) => {

        let lat = params.lat;
        let long = params.long;
        https
            .get(`${process.env.OPENWEATHERMAP}/data/2.5/weather?lat=${lat}&lon=${long}&lang=es&units=metric&appid=${process.env.APPID_WEATHER}`, function (resp) {

                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    resolve(data);

                });
            })
            .on('error', function (err) {                
                reject("ocurrio un error al acceder al servicio del clima por posición geográfica");
            });
    });

}

WeatherApi.getWeatherCurrentByTimeStamp = (params) => {
    return new Promise((resolve, reject) => {

        let lat = params.lat;
        let long = params.long;
        let timestamp = params.timestamp;

        https
            .get(`${process.env.OPENWEATHERMAP}/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${timestamp}&lang=es&units=metric&appid=${process.env.APPID_WEATHER}`, function (resp) {

                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);

                });
            })
            .on('error', function (err) {                
                reject("ocurrio un error al acceder al servicio del clima por posición geografica y timestamp");
            });
    });

}

module.exports = WeatherApi