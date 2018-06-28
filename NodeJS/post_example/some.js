var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/already', function(req, res){
	var html = fs.readFile('./some.html', function(err, html){
		html = " " + html;
		result = 'Such account does not exist!';

		html = html.replace("<%RESULT%>", result);

		res.set('Content-Type', 'text/html');
		res.send(html);
	});
});

app.listen(3000, ()=>{
	console.log('server running on http://localhost:3000/');
});
