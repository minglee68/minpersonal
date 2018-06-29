var express = require('express');
var app = express();

app.get('/', function(req, res){	// 여기서 우리는 HTTP GET request로 '/'를 받으면 callback함수를 실행하라고 
					//route handler를 지정했다.
	res.send('hello world!');
});

app.listen(3000, function() {
	console.log('example app listening on port 3000!');
});
