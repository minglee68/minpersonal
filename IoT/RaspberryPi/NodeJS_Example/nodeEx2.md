Node.js/Express 연습 2
=======================

* nodeEx1.js와 비슷하지만 여기에는 console에 HTTP Line을 통해서 받은 데이터를 JSON형태로 출력해주는 코드가 추가되어있다.
* '192.168.x.x:3000/**?last=Lee&first=MinYoung**'이라고 주소창에 치면 뒷부분의 Parameter가 JSON형태로 보내져서 RPi의 콘솔창에 메세지가 뜰 것이다.
	* `got it {"last":"Lee","first":"MinYoung"}`이라고 출력될 것이다.
	* 여기서 JSON형태란 {"key":"value"}로 표현되는 형식을 말한다.

~~~
const express = require('express');
const app = express();

app.get('/', function(req, res) {
	console.log("got it %j", req.query);
	res.send('Hello World!');
});

app.listen(3000, function() { console.log("Example app listening on port 3000!") });
~~~
