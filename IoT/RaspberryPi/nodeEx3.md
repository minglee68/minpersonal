Node.js/Express 연습 3
=======================

* nodeEx2.js와 비슷하지만 여기에서는 받은 JSON 정보를 Key와 Value를 CSV(Comma-Seperated Values)형식으로 나타내는 연습이다.
* '192.168.x.x:3000/**?last=Lee&first=MinYoung**'이라고 주소창에 치면 뒷부분의 Parameter가 JSON형태로 보내져서 RPi의 콘솔창에 메세지가 뜰 것이다.
	* 먼저 `got it {"last":"Lee","first":"MinYoung"}`이라고 출력될 것이다.
	* 다음 줄부터 첫번째 element부터 차례대로 key,value 형식으로 출력될 것이다.
		* `last,Lee`
		* `first,MinYoung`
	* python3의 dictionary와 비슷한 형식으로 다룰 수 있다.

~~~
const express = require('express');
const app = express();

app.get('/', function(req, res) {
	console.log("got it %j", req.query);		// req로 받은 JSON을 콘솔창에 출력한다
	for (k in req.query) {				// k에는 한 JSON 안에 key가 차례대로 들어간다
		console.log(k + "," + req.query[k]);	// req.query[k]는 k에 해당하는 value가 출력된다
	}
	res.send('Hello World!');
});

app.listen(3000, function() { console.log("Example app listening on port 3000!") });
~~~
