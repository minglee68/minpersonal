HTTP POST request를 써서 로그인 페이지를 만들어보기
===================================================
GET request로는 모든 데이터가 URL에 나타나기 때문에 로그인에는 적합하지 않다.  
이 점을 극복하기 위해서 POST request를 사용하는 방법을 연습해본다.  
여기서 중요한점: form tag의 **method**를 **post**로 해야야한다. 그리고 GET 방식의 Script와는 다르게 POST 방식은 encoded 된 데이터를 request로 받기 때문에 그것을 읽을 수 있는 데이터로 바꾸기 위한 방법을 써야한다. 방법은 server.js의 설명에서 하겠다. 그리고 GET 방식의 Script와 같은 부분은 설명을 생략하겠다.  

server.js
-----------

## 1. 먼저 각종의 필요한 모듈들을 부른다.
~~~
var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017/userInfo';
~~~


## 2. DB를 찾을 때에 사용할 함수들을 function expression으로 만든다.
~~~
var insertDocuments = function(db, query, callback){
	var collection = db.collection('accounts');
	collection.insertOne(query, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log("Inserted one account into 'accounts' collection");
		callback(result);
	});
}

var findDocumentsQuery = function(db, id, ps, callback){
	var collection = db.collection('accounts');

	collection.findOne(id, function(err, account){
		if (err) throw err; 
		
		if (account == null) {
			callback('Such account does not exist!');
		} else if (ps == account.password){
			callback('Log In Success!');
		} else {
			callback('Worng Password!');
		}
	});
}

var checkDocumentsQuery = function(db, id, callback){
	var collection = db.collection('accounts');

	collection.findOne(id, function(err, account){
		if (err) throw err;

		if (account == null){
			callback(false);
		} else {
			callback(true);
		}
	});
}
~~~


## 3. Encoded된 데이터를 받기 위해서 middleware를 지정해준다.
~~~
app.use(express.json());
app.use(express.urlencoded());
~~~
* 위 두 함수로 인해서 POST request로 받아온 encoded된 데이터를 읽을 수 있게 만든다.


## 4. 각종 루트 핸들러 (Route Handler)를 만든다.

### Log In Page와 Register Page 열기
~~~
app.get('/loginpage', function(req, res){
	res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/registerpage', function(req, res){
	res.sendFile(path.join(__dirname + '/register.html'));
});
~~~
* 이전과 동일하게 GET형식으로 route handler를 만든다.


### Log In 기능 / Register 기능 만들기
~~~
app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	
	var idQuery = {};
	idQuery['username'] = username;

	MongoClient.connect(url, function(err, db){
		assert.equal(err, null);
		console.log("Successfully connected to userInfo DB");
		findDocumentsQuery(db, idQuery, password, function(result){
			var html = fs.readFile('./result.html', function(err, html){
				html = " " + html;
				html = html.replace("<%RESULT%>", result);

				res.set('Content-Type', 'text/html');
				res.send(html);
			});
			db.close();
		});
	});
});

app.post('/register', function(req, res){
	var query = req.body

	var idQuery = {};
	idQuery['username'] = query.username;

	MongoClient.connect(url, function(err, db){
		assert.equal(err, null);
		console.log("Successfully connected to userInfo DB");
		checkDocumentsQuery(db, idQuery, function(result){
			if (result == false){
				insertDocuments(db, query, function(){
					var html = fs.readFile('./result.html', function(err, html){
						html = " " + html;
						html = html.replace("<%RESULT%>", "Register Complete!");

						res.set('Content-Type', 'text/html');
						res.send(html);
					});
        	                        db.close();
                        	});
			} else {
				var html = fs.readFile('./result.html', function(err, html){
					html = " " + html;
					html = html.replace("<%RESULT%>", "Account already exists!");

					res.set('Content-Type', 'text/html');
					res.send(html);
				});
				db.close();
			}


		});
		
	});
});
~~~
* GET 방식과의 차이점을 일단 사용하는 app의 method가 `app.post`라는 것이고, 그리고 또 하나는 POST 방식으로 보내진 데이터를 `req.query`가 아니라 `req.body`로 받는다는 점이다. 이 부분 말고는 다른 차이는 없다.


## 5. 마지막으로 서버를 포트번호 3000으로 만든다.
~~~
app.listen(3000, ()=>{
	console.log("server started at http://locahost:3000");
});
~~~







