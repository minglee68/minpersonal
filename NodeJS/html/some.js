var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/some.html'));
});

app.listen(3000, function(err){
	if (err) throw err;

	console.log("Server running on localhost:3000");
});
