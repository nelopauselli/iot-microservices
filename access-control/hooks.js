var express = require('express'),
	router = express.Router(),
	request = require('request'),
	storage = require('./storage');

var hooks = {
	name: 'Control de acceso',
	mac: '12:34:56:78',
	events: [
		{ name: 'tarjeta_valida', subscriptions: [], content: 'mac={mac}&tarjeta_valida={numero}&propietario={propietario}' },
		{ name: 'tarjeta_invalida', subscriptions: [], content: 'mac={mac}&tarjeta_invalida={numero}' }
	],
	actions: ['validar_tarjeta']
};

module.exports = function () {
	router.get('/ping', function (req, res) {
		res.send("pong");
	});

	router.post('/hooks', function (req, res) {
		console.log('registrando nueva subscripcion');
		var eventName = req.body.event;
		var target = req.body.target;
		var content = req.body.content;

		var event = hooks.events.find(function (event) {
			return event.name == eventName;
		})

		if (event) {
			event.subscriptions.push({
				target: target, content: content
			});
		}

		res.sendStatus(201);
	});

	router.get('/hooks', function (req, res) {
		res.json(hooks);
	});

	router.post('/actions', function (req, res) {
		var action = req.body.action;
		if (action == 'validar_tarjeta') {
			console.log('validando tarjera...');
			var numero = req.body.numero;
			console.log('numero: ' + numero);

			storage.get(numero, function (err, reply) {
				var eventName = reply == null ? 'tarjeta_invalida' : 'tarjeta_valida';

				var event = hooks.events.find(function(event){
					return event.name == eventName;
				});

				console.log('notificando ' + event.subscriptions.length + ' subscripciones...');

				event.subscriptions.forEach(function (subscription) {
					var content = subscription.content.replace("{mac}", hooks.mac)
						.replace("{numero}", numero)
						.replace("{propietario}", reply);

					console.log('sending "' + content + '" to ' + subscription.target);
					request({
						url: subscription.target,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': content.length
						},
						method: 'post',
						body: content
					}, function (error, response, body) {
						if (error)
							console.error(error);
						else {
							console.log(response.statusCode);
							if (body) {
								console.log(body)
							}
						}
					});

				}, this);

				res.sendStatus(204);
			});
		}
	});


	return router;
}();