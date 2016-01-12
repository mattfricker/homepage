'use strict';
var express = require('express'),
	logger = require('morgan'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	app = express(),
	port = 3030;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/src/client/index.html');
});

//Final config
app.use(express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
	assert.equal(null, err);
	console.log("Successfully connected to MongoDV");
	
	app.get('/blogList', function(req, res) {
		db.collection('posts').find({}).toArray(function(err, docs) {
			res.send({'posts': docs})
		})
	})
	app.get('/blogPost/:postId', function(req, res) {
		console.log('id is ' + req.params.postId);
		db.collection('posts').find({}).toArray(function(err, docs) {
			res.send({'post': docs})
		})
	})
})