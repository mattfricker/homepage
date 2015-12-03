'use strict';

var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	app = express(),
	port = 3030,
	mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'portfolio'
    });

app.set('views', __dirname + '/src/client/');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/src/client/index.html');
});

//Final config
app.use(express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');