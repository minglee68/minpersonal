Node.js/Express 기본 지식
==========================

### var variableName ###

* JavaScript에서 변수를 선언할 때 사용된다.
* 같은 이름의 변수를 몇 번 선언해도 괜찮다.
~~~
var foo = 'varibale1';
var foo = 'variable2';
~~~

* 선언되기 전에 사용해도 괜찮다.
~~~
console.log(foo);

var foo = 'variable1';
~~~

* Function-Scope로, 유효 범위가 함수 단위이다. 따라서 같은 이름의 변수가 함수 안과 바깥에 있으면 서로 다르다.
~~~
var foo = 'variable1';
console.log(foo);	// variable1

if (true) {
	var foo = 'variable2'
	console.log(foo);	// variable2
}

console.log(foo);	// variable1
~~~

### const constName ###

* JavaScript에서 상수를 선언할 때 사용된다.
* 선언될 때에 꼭 초기값이 있어야 한다.
* 값을 재할당할 경우 에러가 발생한다.
* 재선언할 경우에도 에러가 발생한다.
* 꼭 사용되기 전에 선언이 되어있어야 한다.

### var express = require('express'); \n var app = express(); ###

* 위의 두 코드는 한 세트라고 보면 된다.
* 이 두 코드를 통해서 Express 모듈을 받고 Express Application을 만든다.
* 이를 통해서 HTTP request나 Middleware Configuration, HTML View Rendering등을 쉽게 할 수 있게 된다.

### app.get(path, function(req, res){}); ###

* app.get()메소드를 통해서 HTTP GET request로 path를 받았을 때에 사용한다.
~~~
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});
~~~
* 위의 예제의 경우 '192.168.x.x:8080**/**'라고 적어야지만 function 안의 코드들이 실행된다.

~~~
var express = require('express');
var app = express();

app.get('/data', function (req, res) {
        res.send('Hello World, DATA!');
});
~~~
* 다음 예제의 경우 '192.168.x.x:8080**/data**'라고 적어야지만 function 안의 코드들이 실행된다.

### res.send(String); ###

* 웹페이지에 String이 print out 된다.

### console.log(String); ###

* 콘솔에 String이 print out 된다.

### app.listen(port, function()); ###

* port와 같은 포트 번호로 접근했을 경우 이 node.js가 실행된다.

~~~
app.listen(3000, function () { console.log('Example app listening on port 3000!'); });
~~~
* 위의 예제의 경우 '192.168.x.x:**3000**/'으로 접근해야지 node.js가 실행된다.
* function안의 코드는 이 node.js가 서버에서 실행 됬을 때 바로 실행된다.
	* 따라서 `$ node node.js`를 했을 경우 바로 콘솔 창에 `Example app listening on port 3000!`이라고 출력된다.

### const fs = require('fs'); ###

* File System 모듈을 부른다.
* File System을 다룰 수 있는 함수들을 사용할 수 있게 된다.

### fs.appendFile(path, data, callback) ###

* path와 같은 파일이 있으면 그 끝에 data를 더하고, 없으면 새로운 파일을 만들어서 거기에 data를 더한다.
* path는 원하는 파일까지의 path이다.
* data는 파일에 더하고 싶은 string이다.
* callback은 에러가 났을 경우 에러를 표시하게 하는 function이다.
