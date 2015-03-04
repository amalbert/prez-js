

	var express = require('express');
	var app = express();

	app.use('/web', express.static(__dirname + '/web'));

	app.get('/', function(req, res){
	  res.send('Hello world');
	});

	app.get('/hello', function(req, res){
	  res.send('Hello ' + req.param('name'));
	});

	app.listen(3000);
	console.log('Server running at http://127.0.0.1:3000/');

