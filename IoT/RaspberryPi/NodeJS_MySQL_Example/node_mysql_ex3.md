Node.js/Express와 MySQL을 연동시키는 연습 3 
=============================================

* mydb에서 sensors테이블에 있는 데이터들을 받아 graph.html로 보내는 스크립트이다.
* TIMESTAMP를 출력에 맞게 Format을 바꾸기 위해서 Moment.js를 사용한다.
	* var moment = require('moment-timezone')을 통해서 moment-timezone모듈을 사용할 수 있게 된다.
	* Moment.js가 없다면 `npm install moment --save`와 `npm install moment-timezone --save`로 설치해야 한다.

~~~
var express = require('express');
var app = express();
var fs = require("fs");
var moment = require('moment-timezone'); // TIMESTAMP를 출력에 맞게 Format을 바꾸기 위한 모듈.

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'me',
	password: 'mypassword',
	database: 'mydb'
});
connection.connect();

app.get('/graph', function(req, res) {
	console.log('got app.get(graph)');
	var html = fs.readFile('./graph.html', function (err, html) {	// html 안에 graph.html을 넣는다
		html = " " + html;
		console.log('read file');

		var qstr = 'select * from sensors ';			// sensors테이블 안의 모든 record들을 넣는다
		connection.query(qstr, function (err, rows, cols) {
			if (err) throw err;

			var data = "";
			var comma = "";					// 처음에는 ','가 안 붙기 때문에
			for (var i = 0; i < rows.length; i++){
				r = rows[i];				// 하나의 record
				data += comma + "[new Date(" + moment(r.time).tz("Asia/Seoul").format('YYYY, MM, DD, HH, mm, ss') + "), " + r.value + "]";
				comma = ",";
			}

			var header = "data.addColumn('date', 'Date/Time');";
			header += "data.addColumn('number', 'Temp');";
			html = html.replace("<%HEADER%>", header);	// graph.html의 <%HEADER%>와 header를 바꾼다.
			html = html.replace("<%DATA%>", data);		// graph.html의 <%DATA%>와 data를 바꾼다.

			res.writeHeader(200, {"Content-Type": "text/html"});
			res.write(html);
			res.end();
		});
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s:%s", host, port);
});

~~~
