var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var mongo_ip = process.env.MONGODB_PORT_27017_TCP_ADDR || "192.168.1.116";
var mongo_port = process.env.MONGODB_PORT_27017_TCP_PORT || "27017";
var url = 'mongodb://' + mongo_ip + ':' + mongo_port + '/iot';

console.log(url);

module.exports = {
	listEvents: function (eventName, callback) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server.");

			var docs = [];
			var query = {};

			var criteria = {};
			criteria[eventName] = { $exists: true };

			var cursor = db.collection('events').find(criteria);
			cursor.each(function (err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					docs.push(doc);
				} else {
					db.close();
					callback(null, docs);
				}
			});
		});
	},

	countEvents: function (eventName, callback) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server.");

			var docs = [];
			var query = {};

			var criteria = {};
			criteria[eventName] = { $exists: true };

			var cursor = db.collection('events').aggregate(
				[
					{ $match: criteria },
					{ $count: "count" }
				]
			);

			cursor.each(function (err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					docs.push(doc);
				} else {
					db.close();
					callback(null, docs);
				}
			});
		});
	},
	insert: function (event, callback) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server.");
			event.moment = new Date();
			
			db.collection('events').insertOne(event, function (err, result) {
				assert.equal(err, null);
				console.log("Inserted a document into the events collection.");
				db.close();
				callback(err);
			});
		});
	}
}