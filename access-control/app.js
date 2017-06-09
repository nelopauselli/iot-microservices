var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http')
	storage = require('./storage');

app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function (req, res, next) {
	console.log("[" + req.method + "] " + req.originalUrl);
	next();
})

app.post('/tarjeta', function (req, res) {
	var numero = req.body.numero;
	var propietario = req.body.propietario;
	storage.add(numero, propietario, function(error, reply){
		if(!error)
			res.sendStatus(201);
		else
			res.sendStatus(500);
	});
	
});

app.get('/tarjeta/:numero', function (req, res) {
	var numero = req.params.numero;
	storage.get(numero, function (err, reply) {
		if (reply == null)
			res.sendStatus(404);
		else
			res.send(reply);
	});
});

app.use('/', require('./hooks'));

app.listen(process.env.PORT || 8082, function () {
	console.log('Listening on port ' + (process.env.PORT || 8082));
});