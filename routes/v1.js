const express = require('express');

let router = express.Router();
const RestController = require('../controllers/rest-controller');
const validations=require('../scheme/validations');

router
  .get('/location', RestController.getLocation)
  .get('/current/:city?',validations.validate(validations.validate_input), RestController.getCurrent)
  .get('/forecast/:city?',validations.validate(validations.validate_input), RestController.getForecast)  
  .use(RestController.error404);

module.exports = router;
