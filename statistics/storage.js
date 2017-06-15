var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://mongo:27017/iot';

console.log(url);

module.exports = {
	listEvents: function (eventName, callback) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);

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
	}	
}
