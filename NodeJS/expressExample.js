var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send(200, {data: 'success'});
});

app.listen(3000, function(){
	console.log('server listening at port 3000');
});
