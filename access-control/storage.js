redis = require('redis');

console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

var client = redis.createClient(
	process.env.REDIS_PORT_6379_TCP_PORT,
	process.env.REDIS_PORT_6379_TCP_ADDR
);

client.on('connect', function () {
	console.log('connected');
});

module.exports = {
	add: function(numero, estado, callback){
		client.set(numero, estado, callback);
	},
	get: function(numero, callback){
		client.get(numero, callback);
	}

}