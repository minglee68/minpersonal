var indexCollection = function(db, callback){
	db.collection('documents').createIndex({ "a": 1 }, function(err, results){
		console.log(results);
		callback();
	});
}



var removeDocument = function(db, callback){
	var collection = db.collection('documents');
	collection.deleteOne({a:3}, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field equal to 3");
		callback(result);
	});
}



var updateDocument = function(db, callback){
	var collection = db.collection('documents');
	collection.updateOne({a:2}, {$set: {b:1}}, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Updated the document with the field equal to 2");
		callback(result);
	});
}



var findDocumentsQuerry = function(db, callback){
	var collection = db.collection('documents');
	collection.find({'a':3}).toArray(function(err, docs){
		assert.equal(err, null);
		console.log("Found the following documents");
		console.log(docs);
		callback(docs);
	});
}



var findDocuments = function(db, callback){
	var collection = db.collection('documents');	  // 'documents' collection으로 연결
	collection.find({}).toArray(function(err, docs){  // 'documents'안의 데이터들을 Array로 바꿔서 docs안에 넣는다.
		assert.equal(err, null);
		console.log("Found the following documents");
		console.log(docs);
		callback(docs);
	});
}



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

	/*insertDocuments(db, function() {		//위의 함수를 사용한다.
		updateDocument(db, function(){
			findDocuments(db, function(){
				db.close();
			});
		});
	});*/

	/*updateDocument(db, function(){
		removeDocument(db, function(){
			findDocuments(db, function(){
				db.close();
			});
		});
	});*/

	indexCollection(db, function() {
		db.close();
	});

});
