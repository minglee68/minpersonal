Node.js와 MongoDB
==================

MongoDB와의 연결
----------------
~~~
var MongoClient = require('mongodb').MongoClient;	// 1 
var assert = require('assert');				// 2

var url = 'mongodb://localhost:27017/myproject';	// 3
						
MongoClient.connect(url, function(err, db){		// 4
	assert.equal(null, err);			// 5
	console.log("connected successfully to server");// 6
});
~~~
### Code 설명 ###
1. Node.js를 위한 MongoDB의 모듈 'mongodb'를 부른다.
2. 에러를 확인하기 위한 'assert'모듈을 부른다.
3. MongoDB로 접근하기 위한 'url'이다. 여기엔 4가지 중요한 요소가 있다.
	* 'mongodb'는 말 그대로 MongoDB를 뜻한다.
	* 'localhost'는 우리가 접근할 MongoDB가 있는 host이다. 만일 host가 IP 주소이면 IP주소를 적으면 된다.
	* '27017'은 해당 host에서 MongoDB가 접근할 수 있도록 열어놓은 포트번호이다. MongoDB에서는 Default로 27017이 지정되어있다.
	* 'myproject'는 접근한 MongoDB에 있는 Database의 이름이다.
4. 위에서 적어놓은 'url'를 사용해서 MongoDB로 접근한다. 여기서 'url'의 뒷부분에 지정되어 있는 Database가 존재하지 않는다면 자동적으로 그 이름으로 새로운 Database를 만든다.
5. 만일 4번의 단계에서 에러가 난다면 callback function의 'err'라는 변수에 그 에러의 내용이 들어간다. 따라서 'err'이라는 함수가 null이라면 에러가 없었다는 뜻이 된다. 그래서 여기서 'assert.equal()'을 사용해서 'err'와 null을 비교해서 같으면 문제가 없는 걸로, 다르다면 에러가 있다는걸 보여주고 프로그램을 종료시킨다.
6. 만일 5번의 단계에서 에러가 없어서 문제가 없으면 이 .js를 실행시키고 있는 콘솔 창에 "connected successfully to server"라고 출력되게 한다.


Document를 Insert하기
---------------------

~~~
// 하나만 Insert하기
var insertDocument = function(db, callback){				// 1
        var collection = db.collection('documents');			// 2
        collection.insertOne({a : 1}, function(err, result){		// 3
                assert.equal(err, null);
                assert.equal(1, result.result.n);			// 4
                assert.equal(1, result.ops.length);			// 4
                console.log("Inserted 1 document into the collection");
                callback(result);					// 5
        });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

	insertDocument(db, function(){					// 6
		db.close();						// 7
	});
});
~~~
### Code 설명 ###
1. Function expression으로 insertDocument라는 함수를 만든다. Argument로 받은 DB는 'db'로 들어가고, callback 함수는 'callback'으로 들어간다.
2. 'documents'라는 collection에 접근하기 위한 변수 'collection'을 만든다.
3. 'documents'라는 collection에 접근해서 {a : 1}이라는 document를 하나 넣고, insertOne()의 callback 함수를 시작한다.
	* 'collection'변수를 풀어서 쓰면 `db.collection('documents').insertOne(...)`이 된다. MongoDB의 command와 거의 비슷하다는 것을 알 수 있다.
4. insertOne()함수의 반환으로 받은 값이 1개가 맞는지 확인한다.
	* 반환으로 insert를 한 document의 숫자를 돌려준다.
5. insertDocument()의 callback함수에 result를 보내주면서 callback함수를 시작한다.
6. insertDocument()함수에 db를 보내주면서 callback함수를 정의한다.
7. MongoClient.connect()로 연 DB를 닫는다.


~~~
// 여러 개 Insert하기
var insertDocuments = function(db, callback){		
	var collection = db.collection('documents');	
        collection.insertMany([				// 1
	        {a : 1}, 				// 2
		{a : 2}, 				// 2
		{a : 3}					// 2
        ], function(err, result){			
                assert.equal(err, null);		
                assert.equal(3, result.result.n);	
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                callback(result);
        });
}

var MongoClient = require('mongodb').MongoClient;       
var assert = require('assert');                         

var url = 'mongodb://localhost:27017/myproject';        

MongoClient.connect(url, function(err, db){             
        assert.equal(null, err);                        
        console.log("connected successfully to server");

	insertDocuments(db, function(err, db){
		db.close();
	});
});

~~~
### Code 설명 ###
1. 이전의 하나만 Insert하는 코드와 거의 비슷하지만, insertOne()함수 대신에 insertMany()함수를 사용한다.
2. Array형식으로 document들을 나열해서 올린다. 


Document를 Find하기
-------------------
~~~
// 하나만 Find하기
var findDocument = function(db, callback){
	var collection = db.collection('documents');		 
	collection.findOne({'a' : 1}, function(err, doc){	// 1
		assert.equal(err, null);
		console.log("Found the following document");
		console.log(doc);
		callback(doc);
	});
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

        findDocument(db, function(err, db){
                db.close();
        });
});
~~~
### Code 설명 ###
1. findOne()으로 하나의 document만 찾는다. 
	* {'a': 1}로 명시되어 있듯이 'a' 항목의 값이 1인 document 하나를 찾아서 callback함수의 doc에 넣는다.


~~~
// 모든 것을 Find하기
var findDocuments = function(db, callback){
        var collection = db.collection('documents');
        collection.find({}).toArray(function(err, docs){       // 1
                assert.equal(err, null);
                console.log("Found the following document");
                console.log(docs);
                callback(docs);
        });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

        findDocuments(db, function(err, db){
                db.close();
        });
});
~~~
### Code 설명 ###
1. find({})로 'documents' collection안에 있는 모든 document들을 반환받고, 그것을 toArray()로 Array형식으로 바꿔서 callback함수에서 출력한다.
	* toArray()로 안 하고 출력하려고 하면 undefined로 나온다. array로 타입을 바꿔줘야지 출력이 된다.
	* findOne()은 하나만 받아서 반환하기 때문에 출력할 수 있는 형식이 된다.


~~~
// 특정 Query와 일치하는 모든 Document들을 Find하기
var findDocumentsQuery = function(db, callback){
        var collection = db.collection('documents');
        collection.find({'a':3}).toArray(function(err, docs){       // 1
                assert.equal(err, null);
                console.log("Found the following document");
                console.log(docs);
                callback(docs);
        });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

        findDocumentsQuery(db, function(err, db){
                db.close();
        });
});
~~~
1. {'a':3}과 일치하는 모든 document들을 반환받고, 그것을 toArray()로 Array형식으로 바꿔서 callback함수에서 출력한다.



Document를 Update하기
----------------------
~~~
var updateDocument = function(db, callback){
	var collection = db.collection('documents');
	collection.updateOne({a:2}, {$set: {b:1}}, function(err, result){	// 1
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Updated the document with the field 'a' equals to 2");
		callback(result);
	});
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

        updateDocument(db, function(err, db){
                db.close();
        });
});

~~~
### Code 설명 ###
1. {a:2}와 일치하는 document 하나를 찾아서 그 document에 {b:1}을 더했다.



Document를 Remove하기
-----------------------
~~~
var removeDocument = function(db, callback){
	var collection = db.collection('documents');
	collection.deleteOne({a:3}, function(err, result){	// 1
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field equal to 3");
		callback(result);
	});
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

        removeDocument(db, function(err, db){
                db.close();
        });
});

~~~
### Code 설명 ###
1. {a:3}과 일치하는 document 하나를 지운다.


Collection에 Index를 만들기
-----------------------------
~~~
var indexCollection = function(db, callback){	
	db.collection('documents').createIndex({ "a": 1 }, function(err, results){  // 1
		console.log(results);
		callback();
	});
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

        removeDocument(db, function(err, db){
                db.close();
        });
});

~~~
### Code 설명 ###
1. "a" 항목을 사용해서 오름차순으로 Index를 만든다.

