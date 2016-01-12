"use strict";var express=require("express"),logger=require("morgan"),MongoClient=require("mongodb").MongoClient,assert=require("assert"),env=process.env.NODE_ENV=process.env.NODE_ENV||"development",app=express(),port=3030;app.get("/",function(o,e){e.sendFile(__dirname+"/index.html")}),app.use(express["static"](__dirname)),app.listen(port),console.log("Listening on port "+port+"..."),MongoClient.connect("mongodb://localhost:27017/blog",function(o,e){assert.equal(null,o),console.log("Successfully connected to MongoDV"),app.get("/blogList",function(o,n){e.collection("posts").find({}).toArray(function(o,e){n.send({posts:e})})}),app.get("/blogPost/:postId",function(o,n){console.log("id is "+o.params.postId),e.collection("posts").find({}).toArray(function(o,e){n.send({post:e})})})});