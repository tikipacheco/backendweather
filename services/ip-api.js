const http = require('http');
let IpApi = () => { }

IpApi.getCurrent = () => {
    return new Promise((resolve,reject) => {
        http
            .get(`${process.env.IPAPIURL}/json/`, function (resp) {

                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {                    
                    resolve( data)                    
                });
            })
            .on('error', function (err) {
                reject("ocurrio un error al acceder al servicio ip-api");
            });
    });
}

module.exports = IpApi;