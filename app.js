const express = require('express'),	
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	routes = require('./routes/v1'),
	
	port = (process.env.PORT || 3000),
	app = express()

app
	.set('port', port)
	.use( bodyParser.json() )
	// parse application/x-www-form-urlencoded
	.use( bodyParser.urlencoded({extended: false}) )
	.use( morgan('dev') )
	.use('/v1',routes)
	.use((error,req,res,next)=>{
		res.status(400).json({message:error.message});
	});

module.exports = app