redis = require('redis');

var client = redis.createClient({host: 'redis', port: 6379});

client.on('connect', function () {
	console.log('connected');
});

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
	add: function(numero, propietario, callback){
		client.set(numero, propietario, callback);
	},
	get: function(numero, callback){
		client.get(numero, callback);
	}

}
