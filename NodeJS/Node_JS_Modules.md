Node.js에서 자주 사용되는 모듈들
================================

1. NPM (Node Package Manager)
* * *
* Node Package Manager의 줄임말이다.
* Node.js의 패키지들을 설치하는 것과 버전을 다루는 것을 담당한다.
* `npm install`을 하면 package.json에 명시되어 있는 모든 것을 설치한다.
* `npm install Module_Name`을 하면 Module\_Name을 npm을 사용해서 설치한다.
* `npm install Module_Name -g`를 하면 Module\_Name을 설치하되, 모든 프로젝트에서 사용할 수 있게 된다.
* npm으로 설치한 모듈들은 packages/modules안에 설치되고, 그 패키지를 설치한 프로젝트에 'package.json'에도 저장된다.
* package.json에서 패키지를 관리한다.
* 프로젝트마다 사용되는 패키지와 라이브러리가 다를텐데, 해당 프로젝트에서 사용될 패키지나 라이브러리를 지정해주는 곳이 package.json이다.
ex)
	1. `npm install express`를 하면 express가 설치된다. 하지만 여기서의 문제점은 만일 다른사람과 이 프로젝트를 공유한다면 프로젝트 폴더 뿐만이 아니라 모듈이나 라이브러리도 같이 공유해줘야 된다는 것이다.
	2. 위의 문제점을 해결하기 위해서 Node.js는 package.json이라는 패키지 매니저를 준비했다.
	3. package.json을 사용하기 위해선 먼저 `npm init`으로 package.json을 만들어야 한다.
	4. 'name', 'description', 'keywords' Section에 demo(예시를 위해서)라고 적고 'author'에 자신의 이름을 적고, 'main'항목에 이 패키지들을 사용할 js파일 이름을 적는다.
	5. `npm install express --save`를 하면 express를 현재 프로젝트 폴더 안에 저장하고, 'node\_modules'라는 폴더를 새로 만들 것이다. 그리고 package.json을 봐보면 dependencies에 `"express": "^4.16.3"`이라고 적혀있는 것을 확인할 수 있다.
	6. 이 상태에서 'node\_modules'를 지우고 프로젝트만 공유하고 받은 사람은 `npm install`을 하면 받은 package.json에 따라서 패키지를 자동적으로 설치한다.
	7. express 패키지를 지우고 싶다면 `npm uninstall express --save`를 하면 된다.

2. Globals (Global Objects) - globalExample.js
* * *
* 모든 모듈에서 사용할 수 있는 Object들이다.
* `__dirname`은 지금 실행한 코드가 있는 디렉토리의 path를 알려주고, `__filename`은 지금 실행한 코드가 있는 파일의 path를 알려준다.
* `setTimeout(callback, delay[, ...args])`는 delay milliseconds만큼 기다렸다가 callback을 한 번 실행한다.
* `setInterval(callback, delay[, ...args])`는 매번 callback을 반복하기 전에 delay milliseconds만큼 기다린다.
* `setImmediate(callback, [, ...args])`는 I/O Event의 callback이 실행된 뒤 바로 실행되는 것이다. setTimeout()이나 setInterval()이 시작되기 전에 실행된다.
* 'globaleExample.js'를 실행시켜보면 세 개의 setTimeout(), 그리고 하나의 setInterval()이 있지만 순서대로 되는 것이 아니라 동시에 실행되고 delay시간이 가장 적은 것부터 실행되는 것을 볼 수 있다. 1초가 제일 먼저, 2초가 그 다음, 그리고 5초일 때에는 setTimeout()과 setInterval()이 동시에 출력되는 것을 볼 수 있다. 마지막으로 setInterval()은 5초마다 계속 반복되서 출력되고 있음을 확인할 수 있다.

3. File System
* * *
* 'fs'라는 이름이 파일 시스템의 모듈이다.
* Synchronous방식과 Asynchronous방식 두가지가 있는데, Synchronous방식은 뒤에 Sync라과 붙이면 된다.
* Asynchronous방식을 사용할 때엔 callback을 마지막 argument로 받는다.
	* `fs.readFile('test.txt', function(err, data){...});`
* `fs.open(path, flags[, mode], callback)`은 파일을 Asynchronous방식으로 연다.
* `fs.open(path, flags[, mode])`는 파일을 Synchronous방식으로 연다.
* `fs.close(fd, callback)`
	* **path<string>**는 파일의 path이다.
	* **flags<string>**는 파일을 열때에 주어지는 권한이다.
		* r = 읽을 때 / r+ = 읽고 쓸 때. 파일이 없으면 실행되지 않는다.
		* w = 쓸 때 / w+ = 읽고 쓸 때. 파일이 없으면 만든다.
		* wx = 쓸 때 / wx+ = 읽고 쓸 때. 파일이 있으면 실행되지 않는다.
		* a = 뒤에 붙여서 쓸 때 / a+ = 읽고 뒤에 붙여서 쓸 때. 파일이 없으면 만든다.
		* ax = 뒤에 붙여서 쓸 때 / ax+ = 읽고 뒤에 붙여서 쓸 때. 파일이 있으면 실행되지 않는다.
	* **callback<function>** = function(err, fd){}
* `read(fd, buffer, offset, length, position, callback)`은 파일의 내용을 buffer안에 읽어들이는 것이다.
* `readFile(file[, options], callback)`은 Asynchronous방식으로 읽어들이는 것이다.
* `readFileSync(file[, options])`는 Synchronous방식으로 읽어들이는 것이다.
	* **fd<integer>**는 File Descriptor로, 열린 파일을 가리키는 것이다.
	* **buffer<string|Buffer|Unit8Array>**는 읽어들인 데이터가 저장이 되는 곳이다.
	* **offset<integer>**은 buffer로 읽어들일 때에 buffer에서 시작되는 지점이다.
	* **length<integer>**는 읽어들여질 데이터의 byte수이다.
	* **position<integer>**은 파일의 어디서부터 읽혀질 것인지 지정하는 곳이다.
	* **callback<function>** = function(err, bytesRead, buffer){}
* `writeFile(file, data[, options], callback)`는 Asynchronous방식으로 쓰는 것이다.
* `writeFileSync(file, data[, options])`는 Synchronous방식으로 쓰는 것이다.
	* **file**은 파일 이름이나 fd이다.
	* **data**는 적혀질 데이터이다.
	* **callback<function>** = function(err, bytesRead, buffer){}

4. Events - eventExample.js
* * *
* Node.js에서는 모든 상호작용이 이벤트이다. 
	* request도 event, response도 event 등등...
* 나만의 커스텀 이벤트를 만들 수도 있다.
* `var event = require('events')`는 'events'모듈을 불러들인다.
* 이벤트를 만드는 것을 Emitting Event라고 하고, 이벤트를 인식하게 하는 것을 Capturing Event라고 하고, 이벤트를 시작하게 하는 것을 Triggering Event라고 한다.
* `var eventEmitter = event.EventEmitter();`로 EventEmitter클래스의 오브젝트를 생성한다.
* `eventEmitter.emit('event_name')`은 'event\_name'으로 이벤트를 emit한다.
* `eventEmitter.on('event_name', eventHandler)`은 'event\_name'으로 emit되면 eventHandler가 실행된다.

5. HTTP - httpExample.js
* * *
* HTTP는 Client로부터 Server가 받는 Request나 보내는 Response를 담당하는 모듈이다.
* URL로 request를 받을 수도 있다.
* `var url = require('url')`로 url 모듈을 받는다.
* `var pathname = url.parse(req.url).pathname`으로 Request로 받은 url을 pathname으로 저장한다.
* `console.log(pathname)`으로 출력한다.
* `localhost:3000/somerequest`라고 URL창에 치면 콘솔에 '/somerequest'라고 나오는 것을 확인할 수가 있다.

6. Express
* * *
* Node.js의 대표적인 프레임워크이다. 
* `var express = require('express')`로 express모듈을 불러들인다.
* `var app = express()`로 express의 인스턴스를 만든다.
* `app.get('/', function(req, res){...})`는, domain/로 불렸을 때에 /다음의 parameter로 주어진 내용들을 req로 받고, res로 client로 돌려준다.
* `res.sendFile( __dirname + '/' + 'index.html')`은 html파일을 response로 돌려준다.
* `app.listen(port, domain, function(){})`은 domain의 port 번호를 인식한다는 뜻이다.
* `app.get`말고도 `app.post`, `app.put`, `app.delete`등이 사용될 수 있다.
	* post는 새로운 요소를 만들거나 원래 있던 요소를 바꿀 때 쓰인다.
	* get은 요소를 읽기만 할 때에 쓰인다.
	* put은 원래 있던 요소를 바꿀 때에만 쓰인다.
	* delete는 원래 있던 요소를 없앨 때에 쓰인다.
