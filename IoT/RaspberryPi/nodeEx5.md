Node.js/Express 연습 5 
=======================

* HTTP Line을 통해서 받은 JSON데이터를 JSON 그대로 'data.json'파일에 저장하는 연습이다.
* '192.168.x.x:3000/data**?last=Lee&first=MinYoung&data=data1**'이라고 주소창에 치면 뒷부분의 Parameter가 JSON형태로 보내져서 RPi의 콘솔창에 메세지가 뜰 것이다.
	* 먼저 `got it {"last":"Lee","first":"MinYoung","data":"data1"}`이라고 출력될 것이다.
	* 'data.json'에도 JSON형식 그대로 저장될 것이다.

~~~
const express = require('express');
const app = express();
const fs = require("fs");

app.get('/data', function(req, res) {
	console.log("got it %j", req.query);		// req로 받은 JSON을 콘솔창에 출력한다
	fs.appendFile('data.json', JSON.stringify(req.query) + "\n", function(err) { //JSON데이터를 String으로 바꿔서 보낸다.
		if (err) throw err;		// 에러가 뜨면 에러를 보여준다.
	});
	res.send('Hello World!');
});

app.listen(3000, function() { console.log("Example app listening on port 3000!") });
~~~
