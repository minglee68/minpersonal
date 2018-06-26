Node.js와 MongoDB
==================

MongoDB와의 연결
----------------
~~~
var MongoClient = require('mongodb').MongoClient;  //1
var url = 'mongodb://localhost:27017/mydb'	   //2

MongoClient.connect(url, function(err, db){	   //3
	console.log('connected!');		   
	db.close();				   //4
});
~~~
### Code 설명 ###
1. MongoDB의 모듈을 연다.
2. 연결할 URL을 지정한다. 여기에는 세가지 요소가 있다.
	* mongodb = MongoDB로 연결된다.
	* localhost = local로 연결된다. 다른 host address가 있다면 그걸로 바꾸면 된다.
	* 27017 = 이 포트 번호를 통해서 host로 연결된다.
	* mydb = 연결할 DB의 이름이다.
3. 실제로 MongoDB로 접근하는 코드이다. 연결이 되면 내용이 db로, 에러가 뜨면 에러 내용이 err로 들어간다. 
4. db와의 연결을 끊는다.

DB에서 데이터를 가지고 오기
----------------------------
~~~
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/mydb';

MongoClient.connect(url, function(err, db){
	var cursor = db.collection('customers').find();	//1

	cursor.each(function(err, doc){			//2
		console.log(doc);			//3
	});
});
~~~
### Code 설명 ###
1. cursor는 'customers' collection안에 있는 모든 record들이 들어가있다.
2. cursor안의 record들을 하나씩 doc안에 넣는다.
3. doc를 출력한다.


