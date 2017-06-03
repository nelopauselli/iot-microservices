var express = require('express'),
	router = express.Router(),
	request = require('request'),
	storage = require('./storage');

var hooks = {
	name: 'Control de acceso',
	mac: '12:34:56:78',
	events: ['tarjeta_valida', 'tarjeta_invalida'],
	subscriptions: [],
	actions: ['validar_tarjeta']
};

module.exports = function () {
	router.get('/ping', function (req, res) {
		res.send("pong");
	});

	router.post('/hooks', function (req, res) {
		console.log('registrando nueva subscripcion');
		var event = req.body.event;
		var target = req.body.target;

		hooks.subscriptions.push(event + ":" + target);

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
				var event = reply == null ? 'tarjeta_invalida' : 'tarjeta_valida';

				console.log('buscando subscripciones a "' + event + '" que notificar...');
				var subscriptions = hooks.subscriptions.filter(function (subscription) {
					return subscription.startsWith(event);
				});

				console.log('notificando ' + subscriptions.length + ' subscripciones...');
				var content = { mac: hooks.mac };
				content[event] = numero;
				content["estado"] = reply;
				
				subscriptions.forEach(function (subscription) {
					var target = subscription.substring(subscription.indexOf(':') + 1);
					console.log('notificando a ' + target);

					request({
						url: target,
						method: 'post',
						form: content
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