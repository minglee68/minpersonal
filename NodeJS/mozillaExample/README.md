Node.js / Express에 대한 설명.
===============================

Basics
------
~~~
// app.js
var express = require('express');
var app = express();

app.get('/', function(req, res){	// 1 
	res.send('hello world!');	// 2
});

app.listen(3000, function() {
	console.log('example app listening on port 3000!');
});
~~~
1. 여기서 우리는 app.js가 client로부터 HTTP GET request로 '/'를 받으면 뒤에 있는 callback함수를 실행시키라는 Route Handler를 만들었다. Callback 함수는 request와 response를 object로 argument로 받는다.
	* Express의 application(지금의 경우 'app')은 get()말고도 다른 HTTP verb들을 받는 함수가 여러가지 있다. `post()`, `put()`, `delete()`, `options()`, `trace()`, `copy()`, `lock()`, `mkcol()`, `move()`, `purge()`, `propfind()`, `proppatch()`, `unlock()`, `report()`, `mkactivity()`, `checkout()`, `merge()`, `m-search()`, `notify()`, `subscribe()`, `unsubscribe()`, `patch()`, `search()`, 그리고 `connect()`가 있다.
	* 위의 method들 말고도 특별한 routing method가 있는데, `app.all()`이다. 이건 어떤 HTTP method로 불러도 받는 것이다. 
2. 여기서는 response의 `send()` method를 써서 'Hello world!'라는 string를 반환했다. response에는 이것 말고도 많은 method가 있는데, 예를 들자면 JSON을 반환하는 `res.json()`나 파일을 보내는 `res.sendFile()`이 있다.

~~~
...
app.all('/secret', function(req, res, next){
	console.log('Accessing the secret section ...');
	next(); // 다음 handler로 넘어간다.
});
...
~~~
* 이렇게 하면 어떤 형식으로든 '/secret'을 받으면 실행되게 한다.



Routes
------
* 루트는 특정의 패턴을 URL로부터 인지해서 그 URL에 있는 값들을 parameter에서부터 route handler로 건내주는 역할을 한다.
* Route handler도 한 파일에 모아서 루트 모듈을 만들 수 있다.

~~~
// wiki.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('Wiki home page');
});

router.get('/about', function(req, res){
	res.send('About this wiki');
});

module.exports = router;
~~~
* 위의 루트 모듈 wiki.js를 사용하기 위해선 메인 app.js에서 './wiki.js'로 require()를 해야한다.
* 그러고나서 `use()`로 Middleware handling path를 만들고 거기에서 '/wiki'로 http request를 받았을 때에 이 루트 모듈에 있는 루터들이 사용되게 한다.
* '/wiki/'를 하면 첫번째 get루터가, '/wiki/about'을 하면 두번째 get루터가 사용될 것이다.
* 아래가 사용 예이다.

~~~
var express = require('express');
var app = express();
var wiki = require('./wiki.js');

app.use('/wiki', wiki);			// 이 줄에서 wiki.js 루트 모듈이 사용된다.

app.get('/', function(req, res){        // 여기서 우리는 HTTP GET request로 '/'를 받으면 callback함수를 실행하라고
                                        //route handler를 지정했다.
        res.send('hello world!');
});

app.listen(3000, function() {
        console.log('example app listening on port 3000!');
});

~~~



Middleware
-----------
* Middleware는 Express에서 뺄 수 없는 요소 중 하나이다.
* Static file(img, html, etc...)을 받거나, Error Handling이나, HTTP Request/Response를 다루는 일 등에 사용된다.
* Route함수에서는 request를 받고 그에 해당하는 response를 반환하는 것으로 끝나지만, Middleware는 어떤request나 response에 대한 작업을 하고 'stack'에 쌓여있는 다음 작업으로 넘어가는 형식이다.
* 대체적으로 이미 Express팀이 만든 Middleware를 사용해서 Cookie, Session, 사용자 인증, JSON, logging 등의 기능을 바로 구현할 수 있다.
* 예를 들자면 logging을 위해서 'morgan'이라는 모듈을 사용한다고 하자.
	1. `npm install morgan`으로 패키지를 받는다.
	2. `var logger = require('morgan');`으로 모듈을 부른다.
	3. `app.use(logger('dev'));`로 사용한다.
* Middleware나 Route함수들은 선언된 순서대로 실행된다. 그래서 어떤 Middleware들은 순서가 매우 중요하다.
	* 예를 들자면 session middleware는 cookie middleware에 의존하기 때문에 cookie handler가 먼저 온 후에 session을 다뤄야 한다.
* Middleware를 더할 때에 `app.use()`를 사용해서 더한다.
	* `app.use()`는 모든 루트에 대해서 사용하거나 어떤 특정 루트에 대해서만 사용할 수도 있다.


~~~
var express = require('express');
var app = express();

// An example middleware function
var a_middleware_function = function(req, res, next) {
  // ... perform some operations
  next(); // Call next() so Express will call the next middleware function in the chain.
}

// 모든 루트를 위한 것
app.use(a_middleware_function);

// 특정 루트를 위한 것
app.use('/someroute', a_middleware_function);

// 특정 HTTP verb (GET)와 특정 루트를 위한 것
app.get('/', a_middleware_function);

app.listen(3000);
~~~


Static File
-------------
* express.static middleware를 사용해서 static file들을 불러올 수 있다.
	* image, CSS, Javascript 등등...
* 사용하는 방법은 단순하다. `app.use(express.static('public'));`을 더해주면 node가 실행된 디렉토리에 있는 'public'디렉토리 안의 static파일들을 열 수있다.
	* `http://localhost:3000/kitten.jpg`라고 하면 자동으로 'public'안에 있는 'kitten.jpg'를 연다.
	* `app.use('/static', express.static('public'));`이라고 해서 특정 루트를 지정할 수도 있다.
* 여러개의 static middleware를 선언해서 사용할 수도 있다. 그 경우 파일이 첫번째 static middleware에 없다면 다음 것으로 넘어가서 찾는다.

