const app = require('./app'),
    server = app.listen(app.get('port'), () => {
        console.log(`Se inicio el servidor en el puerto ${app.get('port')}`)
    })