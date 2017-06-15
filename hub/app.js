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
	res.send("Hello, I'm an IoT hub");
});

app.post('/', function (req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var message = req.body;

	console.log("Incomming message from " + ip + " to hub. Body: " + JSON.stringify(message));

	storage.insert(message, function (err) {
		if (!err)
			res.sendStatus(200);
		else
			res.sendStatus(500);
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
	console.log('Example app listening on port ' + port + '!');
});
