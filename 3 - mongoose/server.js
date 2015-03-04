	var express = require('express');
	var app = express();
	
	require('mongoose').connect('mongodb://localhost/users');

	var bodyParser = require('body-parser')

	var service = require('./service');
	var User = require('./user');

	function sendJson(res, object) {
		res.setHeader('Content-Type', 'text/json');
		res.send(object);
	}
	function sendError(res, error) {
		res.status(500);
		sendJson(res, { 'error' : error });
	}

	app.use(bodyParser.json())

	app.get('/user', function(req, res){
		service.list().then(function (users) {
			sendJson(res, users);
		}, function(error) {sendError(res, error);});
	});

	app.put('/user', function(req, res){
		console.log(req.body);
		var user = new User(req.body);
		service.save(user).then(
			function (user) { sendJson(res, user); }
		  , function(error) { sendError(res, error); });
	});

	app.listen(3000);
	console.log('Server running at http://127.0.0.1:3000/');

