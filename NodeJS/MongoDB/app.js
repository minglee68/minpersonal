var insertDocuments = function(db, callback){		// function expression.
	var collection = db.collection('documents');	// open 'documents'collection
        collection.insertMany([				
	        {a : 1}, {a : 2}, {a : 3}
        ], function(err, result){			// 'result'안에는 'documents'안의 document들이 있다.
                assert.equal(err, null);		// if err != null, assert this error
                assert.equal(3, result.result.n);	
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                callback(result);
        });
}



var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');				// Assert module checks if statement in it is true or not.

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("connected successfully to server");

	insertDocuments(db, function() {
		db.close();
	});
});
