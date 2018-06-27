var insertDocuments = function(db, callback){		// function expression.
	var collection = db.collection('documents');	// open 'documents'collection
        collection.insertMany([				
	        {a : 1}, {a : 2}, {a : 3}
        ], function(err, result){			// 'result'안에는 'documents'안의 document들이 있다.
                assert.equal(err, null);		// if err != null, assert this error
                assert.equal(3, result.result.n);	
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
		// 여기까지가 callback function이 일어나기 전의 내용들.
                callback(result);
        });
}



var MongoClient = require('mongodb').MongoClient;	// MongoDB Module을 부른다.
var assert = require('assert');				// Assert module checks if statement in it is true or not.

var url = 'mongodb://localhost:27017/myproject';	// localhost라는 host로 27017을 통해서 연결하고
							// mongodb의 myproject DB로 연결한다.
MongoClient.connect(url, function(err, db){		// 연결을 했을 때에 만일 myproject라는 DB가 없으면 새로 만든다.
	assert.equal(null, err);
	console.log("connected successfully to server");

	insertDocuments(db, function() {		//위의 함수를 사용한다.
		db.close();
	});
});
