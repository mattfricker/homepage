'use strict';

var express = require('express'),
	logger = require('morgan'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	app = express(),
	port = 3030,

app.set('views', __dirname + '/src/client/');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/src/client/index.html');
});

//Final config
app.use(express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');