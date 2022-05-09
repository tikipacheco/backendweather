const ipapi = require('../services/ip-api');
const utils = require('../helpers/utils');
const weatherapi = require('../services/weatherapi');

let RestController = () => { }

RestController.getLocation = (req, res, next) => {
    res.set('Content-Type', 'application/json');

    const promesa = ipapi.getCurrent();

    promesa
        .then((data) => {
            res.json(utils.responseJson(200, "success", JSON.parse(data)));
            res.end();
        })
        .catch((err) => {
            res.status(400).json(utils.responseJson(400, "Ocurrio un error al obtener la location con ip-api", ''));
            res.end();
        })
}

RestController.getCurrent = (req, res, next) => {
    res.set('Content-Type', 'application/json');

    const promesa = ipapi.getCurrent();

    promesa
        .then((data) => {
            let datos_result = JSON.parse(data);
            let param = { lat: datos_result.lat, long: datos_result.lon };

            if (req.params.city != undefined) {
                const promesa = weatherapi.getWeatherCurrentByCity(req.params);
                promesa
                    .then((data) => {
                        let datos_salida = { 'ubicacion': datos_result, 'clima': JSON.parse(data) };

                        res.json(utils.responseJson(200, "success", datos_salida));
                        res.end();
                    })
                    .catch((err) => {
                        res.status(400).json(utils.responseJson(400, "Ocurrio un error al obtener el clima por ciudad", ''));
                    })

            } else {
                const promesa = weatherapi.getWeatherCurrentByIp(param);
                promesa
                    .then((data1) => {
                        let datos_salida = { 'ubicacion': datos_result, 'clima': JSON.parse(data1) };
                        res.json(utils.responseJson(200, "success", datos_salida));
                        res.end();
                    })
                    .catch((err) => {
                        res.status(400).json(utils.responseJson(400, "Ocurrio un error al obtener el clima por ip actual", ''));
                    })
            }
        }).catch((err) => {
            res.status(400).json(utils.responseJson(400, err.message, ""));
        })
}

RestController.getForecast = (req, res, next) => {
    res.set('Content-Type', 'application/json');

    const promesa = ipapi.getCurrent();

    promesa
        .then((data) => {
            if (req.params.city != undefined) {
                const promesa = weatherapi.getWeatherCurrentByCity(req.params);
                promesa
                    .then((data) => {
                        let datos_result = JSON.parse(data);
                        let coord = datos_result.coord;

                        let d = new Date();

                        let fiveDaysAgo = utils.getDateXDaysAgo(5, d);  //change day here
                        let timestamp = Date.parse(fiveDaysAgo) / 1000; //EPOC timestamp in seconds.
                        
                        let param = { lat: coord.lat, long: coord.lon, timestamp: timestamp };
                        const promesa = weatherapi.getWeatherCurrentByTimeStamp(param);

                        promesa
                            .then((data1) => {
                                let datos_salida = { 'ubicacion': datos_result, 'clima': JSON.parse(data1) };

                                res.json(utils.responseJson(200, "success", datos_salida));
                                res.end();
                            })
                            .catch((err) => {
                                res.json(utils.responseJson(400, "Ocurrio un error al obtener el clima por timestamp", ''));
                            })

                    })
                    .catch((err) => {
                        res.json(utils.responseJson(400, "Ocurrio un error al obtener el clima por ciudad", ''));
                    })
            } else {
                let datos_result = JSON.parse(data);

                let d = new Date();

                let fiveDaysAgo = utils.getDateXDaysAgo(5, d);  //change day here
                let timestamp = Date.parse(fiveDaysAgo) / 1000; //EPOC timestamp in seconds.
                

                let param = { lat: datos_result.lat, long: datos_result.lon, timestamp: timestamp };

                const promesa = weatherapi.getWeatherCurrentByTimeStamp(param);
                promesa
                    .then((data1) => {
                        let datos_salida = { 'ubicacion': datos_result, 'clima': JSON.parse(data1) };

                        res.json(utils.responseJson(200, "success", datos_salida));
                        res.end();
                    })
                    .catch((err) => {
                        res.json(utils.responseJson(400, "Ocurrio un error al obtener el clima por timestamp", ''));
                    })
            }
        })
        .catch((err) => {
            res.json(utils.responseJson(400, "Ocurrio un error al obtener la location por ip-api ", ''));
        })
}

RestController.error404 = (req, res, next) => {
    res.json(utils.responseJson(404, "No se encontro una ruta", ''));
    next()
}

module.exports = RestController
