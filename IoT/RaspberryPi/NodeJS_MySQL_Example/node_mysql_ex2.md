Node.js/Express와 MySQL을 연동시키는 연습 2 
=============================================

* mysql에 있는 특정 데이터베이스의 특정 테이블 안에 값을 넣는 연습이다.
* connection.query()를 통해서 테이블에 값을 넣는데, 아래와 같은 형식으로 넣는다.
	* insert into TABLENAME	(FIELDNAME1, FIELDNAME2, ...) values (VALUE1, VALUE2, ...)

~~~
var express = require('express');
var app = express();
var fs = require("fs");

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'me',
	password: 'mypassword',
	database: 'mydb'
});
connection.connect();

function insert_sensor(device, unit, type, value, seq, ip){
	var query = connection.query("insert into sensors (seq, type, device, unit, ip, value) values (?, ?, ?, ?, ?, ?)", [Number(seq), type, Number(device), Number(unit), ip.replace(/^.*:/, ''), Number(value)], function(err, rows, cols) {
		if (err) throw err;
		console.log("database insertion completed");
	});
}

app.get('/', function(req, res) {
	res.end('Nice to meet you');
});

app.get('/log', function(req, res) {
	r = req.query;
	fs.appendFile("sensor.json", JSON.stringify(req.query) + "\n", function(err) {
		if (err) throw err;
	});
	console.log("GET %j", r);

	insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
	res.end('OK: ' + JSON.stringify(req.query));
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s:%s", host, port);
});

~~~
