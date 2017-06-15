var express = require('express');
var bodyParser = require('body-parser');
var storage = require('./storage');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	res.send("Hello, What do you want know?");
});

app.get('/api/list/:event', function (req, res) {
	storage.listEvents(req.params.event, function (err, events) {
		if (!err)
			res.json(events);
		else
			res.sendStatus(500);
	});
});

app.get('/api/count/:event', function (req, res) {
	console.log(req.params.event);
	storage.countEvents(req.params.event, function (err, events) {
		res.json(events);
	});
});

app.get('*', function (req, res) {
	res.status(404).send('what???');
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('App listening on port ' + port + '!');
});
