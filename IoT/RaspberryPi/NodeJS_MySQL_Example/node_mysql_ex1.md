Node.js/Express와 MySQL을 연동시키는 연습 1
=============================================

* mysql에 있는 특정 데이터베이스의 특정 테이블 안에 값을 넣는 연습이다.
* connection.query()를 통해서 테이블에 값을 넣는데, 아래와 같은 형식으로 넣는다.
	* insert into TABLENAME	(FIELDNAME1, FIELDNAME2, ...) values (VALUE1, VALUE2, ...)

~~~
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'me',
	password: 'mypassword',
	database: 'mydb'
});
connection.connect();

var query = connection.query("insert into sensors (seq, type, device, unit, ip, value) values (1, 'T', 102, 0, '192.168.0.101', 10.9)", function(err, rows, cols) {
	if (err) throw err;
	console.log("done");
	process.exit();
});
