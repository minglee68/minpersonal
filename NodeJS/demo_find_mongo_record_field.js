var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;

	var dbo = db.db('mydb');
	var cursor = dbo.collection('customers').find();

	dbo.collection('customers').find().each(function (err, doc){
		if (err) throw err;

		if (doc == null){
			db.close();
		}

		console.log("Name: " + doc.name);
		console.log("Address: " + doc.address);
		console.log("---------");
	});

	db.close();
});
