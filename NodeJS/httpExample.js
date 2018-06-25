var http = require("http"); 
var url = require('url');

var server = http.createServer(function(request, response){
	var pathname = url.parse(request.url).pathname;
	console.log(pathname);

	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Welcome to Node.js\n');
});

server.listen(3000, function(){
	console.log('Server runnign at http://localhost:3000/');
});
