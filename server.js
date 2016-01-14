'use strict';
var express = require('express'),
	logger = require('morgan'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
	app = express(),
	port = 3030;

var indexFile = env === 'dev' ? __dirname + '/src/client/index.html' : __dirname + '/index.html';
app.get('/', function(req, res){
	res.sendFile(indexFile);
});


//Final config
app.use(express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
	assert.equal(null, err);
	console.log("Successfully connected to MongoDV");
	
	app.get('/blogList', function(req, res) {
		db.collection('posts').find({}, {_id: 0}).toArray(function(err, docs) {
			res.send({'posts': docs})
		})
	})
	app.get('/blogPost/:postId', function(req, res) {
		var postId = Number(req.params.postId);
		console.log('id is ' + postId);
		db.collection('posts').find({postId: postId}, {_id: 0}).toArray(function(err, docs) {
			res.send({'post': docs})
		})
	})
	app.get('/portfolio', function(req, res) {
		db.collection('portfolio').find({}, {_id: 0}).toArray(function(err, docs) {
			res.send({'portfolio': docs})
		})
	})
})