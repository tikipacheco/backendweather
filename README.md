# API Clima

La aplicación clima ofrece una API sobre el estado del tiempo basado en
diferentes endpoints.

# Index

- [Index](#index)
- [Estructura de carpertas y uso](#estructura-de-carpertas-y-uso)
- [Archivos en la raiz](#archivos-en-la-raiz)
- [Enpoints](#enpoints)
- [Scripts](#scripts)
- [Licencia](#licencia)

# Estructura de carpertas y uso


- **controllers**: Contiene la capa de logica de negocios. Es la parte que executa las necesidad de la app e interactua con el modelo.
- **routes**: Contiene las versiones de las api, y sus respectivos endpoints. 
- **services**: Contiene servicios a terceras partes u otros microservicios. 
Este directorio debe contener todas las interacciones con otros servicios API.
- **scheme**: Contiene las validaciones de la entrada de datos.
- **helpers**: Contiene funciones utiles a reutilizadas en el proyecto.
- **test**: Contiene las pruebas unitarias de los endpoints.

## Archivos en la raiz

- **server.js**: Con este archivo inicia la aplicación.
- **.env**: Define las variables de entorno de la aplicación.
- **app.js**: Contiene la aplicación a ejecutarse.

# Enpoints

| Enpoints | Description |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| /location | Devuelve los datos de ubicación city según ip-api. |
| /current | City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo actual. |
| /forecast | City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días |


# Scripts
Se pueden usar los siguientes comandos:
| Command | Description |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| npm start | Se inicia el servidor. |
| npm test | Se ejecutan los test definidos en el archivos test/app.test.js |


# Licencia

© [Pacheco Ricardo](https://www.github.com/tikipacheco)
