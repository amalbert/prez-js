	var express = require('express');
	var app = express();

	var bodyParser = require('body-parser')

	var mongo = require('mongodb').MongoClient;
	var db;
	mongo.connect("mongodb://localhost/users", function(err, database) {
		if(!err) {
			console.log("We are connected");
			db = database;
		}
	});

	function sendJson(res, object) {
		console.log("sendJson");
		res.setHeader('Content-Type', 'text/json');
		res.send(object);
	}
	function sendError(res, error) {
		console.log("sendError");
		res.status(500);
		sendJson(res, {error:error});
		console.log(error);
	}

	// parse application/json
	app.use(bodyParser.json())

	app.get('/user', function(req, res){
		var collection = db.collection('users');
		collection.find().toArray(function(err, items) {
			if(!err) {
				sendJson(res, items);
			} else {
				sendError(res, err);
			}
		});
	});

	app.put('/user', function(req, res){
		var user = req.body;
		console.log(user);
		var collection = db.collection('users');
		collection.insert(user, function(err, result) {
			console.log(err);
			console.log(result);
			if(!err) {
				sendJson(res, result);
			} else {
				sendError(res, err);
			}
		});
	});

	app.listen(3000);
	console.log('Server running at http://127.0.0.1:3000/');

