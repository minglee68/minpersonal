var http = require("http"); // 모듈을 부를 때에 'require'를 사용한다.

var port = 3000; // 포트 번호

// Web server object를 만드는 과정이다.
// 이 안에 있는 function(request, response)는 HTTP Request가 주어질 때마다 
// 하나씩 만들어지기 때문에 Request Handler라고 불리기도 한다.
var server = http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});  // HTTP Header를 보내는 역할이다
	response.end('Welcome to Node.js\n');  // 데이터를 보내는 역할이다
});

// 위에서 만든 server instance를 특정 포트와 연결하기 위한 작업이다.
server.listen(port, function(){
	console.log('Server runnign at http://localhost:3000/');
});
