var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://mongo:27017/iot';

console.log(url);

module.exports = {
	insert: function (event, callback) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
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
