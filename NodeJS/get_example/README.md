HTTP GET request를 써서 로그인 페이지를 만들어보기
====================================================
지금까지 배운 Node.js/express와 MongoDB를 사용해서 로그인 페이지를 만들어본다.  
일단은 만들어진 login.html과 register.html, 그리고 result.html을 받아온다.  
여기서 중요한점: form tag의 **method**를 **get**으로 해야한다. 원래 아무 지정을 안 해주면 default로 get method가 된다. 그리고 action에 특정 루트를 지정해줘야 된다. 이 루트를 나중에 Node.js/express에서 사용할 것이다. 그럼 이제 server.js를 설명하겠다.


server.js
----------
## 1. 먼저 각종 필요한 모듈들을 부른다.
	* 여기에선 Node.js의 프레임워크인 express, html파일의 위치를 찾아내기 위한 path, MongoDB와 연결하기 위한 mongodb, 에러산출을 위한 assert, 그리고 html 파일을 부르기 위한 fs를 사용할 것이다.
~~~
var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017/userInfo';		// MongoDB의 userInfo DB를 열기 위한 URL

...
~~~


## 2. DB를 찾을 때에 사용할 함수들을 function expression으로 만든다.

### Insert Document

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
~~~
* Document를 'query'라는 변수로 받아서 'userInfo'라는 DB안의 'accounts'라는 Collection 안에 넣는다. 'query' 자체가 JSON 형식이다.
* assert로 먼저 err가 없는지, 그리고 insert한 Document의 숫자가 하나가 맞는지 확인한다.


### Find Document with Query

~~~
var findDocumentsQuery = function(db, id, ps, callback){
	var collection = db.collection('accounts');

	collection.findOne(id, function(err, account){
		if (err) throw err; 
		
		if (account == null) {
			callback('Such account does not exist!');
		} else if (ps == account.password){
			callback('Log In Success!');
		} else {
			callback('Wrong Password!');
		}
	});
}
~~~
* Document의 username 정보를 JSON형식으로 'id'변수를 통해서 받고, password 정보를 string형식으로 'ps'변수를 통해서 받는다.
* 'id'를 통해서 찾은 결과를 'account'라는 변수에 넣는데, 'account'가 null이라면 못찾았다는 것이기 때문에 'Such account does not exist!'라는 메시지를 callback 함수로 보내준다.
* 만일 'account'가 null이 아니라면 'ps'와 'account'에 있는 'password' field의 값이 같으면 아이디와 비밀번호가 일치했다는 뜻이기 때문에, 'Log In Success!'를 callback함수로 보내준다.
* 만일 'ps'와 'account'의 'password' 값이 다르면 패스워드가 틀렸기 때문에 'Wrong Password!'라고 callback함수로 보내준다.


### Check Documents with Query if it already exists

~~~
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
* Document의 username 정보를 JSON 형식으로 'id'변수를 통해서 받는다.
* 'accounts' Collection 중에서 id로 찾아보고 결과를 'account' 안에 넣는다.
* 'account'가 null이면 못 찾았다는 뜻이기 때문에 false값을 callback함수로 보내준다.
* 'account'가 null이 아니면 찾았다는 뜻이기 때문에 true값을 callback함수로 보내준다.


## 3. 각종 루트 핸들러 (Route Handler)를 만든다.


### Log In Page와 Register Page 열기

~~~
app.get('/loginpage', function(req, res){
	res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/registerpage', function(req, res){
	res.sendFile(path.join(__dirname + '/register.html'));
});
~~~
* URL뒤에 '/loginpage'를 GET 형식으로 request를 받으면 client에게 login.html을 반환해준다.
* URL뒤에 '/registerpage'를 GET 형식으로 request를 받으면 client에게 register.html을 반환해준다.


### Log In 기능 만들기

~~~
app.get('/login', function(req, res){
	var username = req.query.username;
	var password = req.query.password;
	
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
~~~
* Action으로 '/login'을 GET 형식으로 request를 받으면 callback 함수를 시작한다.
* GET 형식으로 받은 값중에서 username의 값을 'username' 변수 안에 넣는다.
* GET 형식으로 받은 값중에서 password의 값을 'password' 변수 안에 넣는다.
* 'idQuery'라는 변수를 만들어서, 거기 안에 'username'변수의 값을 'username'이라는 key로 JSON 값을 하나 만든다.
* MongoClient.connect로 'url'을 사용해서 localhost의 포트번호 27017을 통해서 userInfo라는 DB로 연결을 한다. 연결된 오브젝트를 'db'변수로 보낸다.
* findDocumentsQuery함수로 db, idQuery(JSON), password(string)을 보내준다. findDocumentsQuery함수에서 callback함수로 보낸 값을 'result' 변수로 받는다.
* 'result.html'을 읽어서 callback함수의 'html'변수 안에 넣는다.
* `html = " " + html;`은 꼭 필요하다. 일종의 convention이다.
* 'result.html'안의 '<%RESULT%>'부분을 findDocumentsQuery의 callback함수로 받은'result'로 바꿔서 'html'변수 안에 넣는다.
* `res.set()`으로 앞으로 보낼 response가 html형식임을 선언한다.
* `res.send()`로 'html'의 내용을 보낸다.
* db를 닫는다.



### Register 기능 만들기

~~~
app.get('/register', function(req, res){
	var query = req.query

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
* Action으로 '/register'을 GET 형식으로 request를 받으면 callback 함수를 시작한다.
* GET 형식으로 받은 JSON 데이터를 'query'라는 변수 안에 넣는다.
* 'idQuery'라는 변수를 만들어서, 거기 안에 'query'의 username 값을 'username'이라는 key로 JSON 값을 하나 만든다.
* MongoClient.connect로 'url'을 사용해서 localhost의 포트번호 27017을 통해서 userInfo라는 DB로 연결을 한다. 연결된 오브젝트를 'db'변수로 보낸다.
* checkDocumentsQuery함수로 db, idQuery(JSON)을 보내준다. checkDocumentsQuery함수에서 callback함수로 보낸 값을 'result'변수로 받는다.
* 만일 'result'의 값이 false이면 현재 DB에 request로 받은 account와 같은 username이 없다는 뜻이기 때문에 insertDocuments함수로 register 하려는 account의 정보를 'query'로 보내준다.
* insertDocuments함수가 성공하면 'register.html'의 '<%RESULT%>'부분을 "Register Complete!"로 바꿔서 html 형식으로 response를 보낸다.
* 만일 'result'의 값이 true이면 현재 DB에 request로 받은 account와 같은 username이 있다는 뜻이기 때문에 'result.html'의 '<%RESULT%>'부분을 "Account already exists!"로 바꿔서 html 형식으로 response를 보낸다.



## 4. 마지막으로 서버를 포트번호 3000으로 만든다.

~~~
app.listen(3000, ()=>{
	console.log("server started at http://locahost:3000");
});
~~~

