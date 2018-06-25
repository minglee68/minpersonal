Synchronous와 Asynchronous의 차이
==================================

* Node.js를 본격적으로 활용하기 전에 Node.js에서 사용하는 Asynchronous 방식이 뭔지 알아본다.  
* 먼저 Synchronous방식이란 본래의 Multi-Threaded방식으로, 하나의 입력을 받으면 그 입력에 대한 반환이 이루어질 때 까지 기다렸다가 다음 입력을 실행하는 것을 얘기한다.    
* 반대로 Asynchronous방식은 여러 개의 입력을 받으면 그것들을 동시에 실행시키는 방식을 얘기한다.  
예제로 봐보면 이해하기가 더 쉽다.   

~~~
// test.txt, 아무거나 긴 내용을 넣어 놓는다.
hello world
hello world
hello world
hello world
hello world
...
~~~

~~~
//sync.js

var fs = require('fs'); // File System 모듈을 부른다

var data = fs.readFileSync('test.txt'); // test.txt를 읽어들인다.
console.log(data.toString()); // utf-8 data를 String으로 바꾸는 방법이다.
console.log('End Read File');
~~~

* 위와 같은 방식으로 하고 `node sync.js`를 하면 test.txt안에 있는 내용이 다 출력 된 후에 'End Read File'이 출력되는 것을 확인할 수 있다.
* 두번째로는 Asynchronous방식을 해본다.

~~~
// async.js

var fs = require('fs');

// 여기에서 차이점이 나온다.
// 모든 Asynchronous 방식에서는 Callback 함수를 뒤에 붙여야 된다.
// 여기서는 Callback 함수가 만일 이 Operation을 실행하는 데 에러가 뜨면
// 해당하는 에러가 err로 들어가고, 성공하면 'test.txt'를 읽어낸 데이터가
// data안에 들어가서 함수를 시작한다.
fs.readFile('test.txt', function(err, data){
	if (err) {console.log('Error occured during reading file');} // 에러가 났을 경우

	// 1초(1000msec) 기다리고 읽어들인 data를 string으로 출력한다.
	setTimeout(()=>{	// 위의 'function(){}'의 짧은 syntax이다.
		console.log(data.toString());
	}, 1000);
});

console.log('End Read File');
~~~

* 위와 같이 만들고 `node async.js`를 하면 먼저 End Read File을 한 후에 test.txt의 내용이 출력되는 것이 확인될 수 있다.
* Asynchronous방식에서는 먼저 callback함수가 시작됨과 동시에 다음 코드가 실행이 된다.
* 이번의 경우에는 `function(err, data){...}`함수가 불려짐과 동시에 다음 코드인 `console.log('End Read File')`이 실행이 되서 `function(..){..}`에서 `setTimeout()`으로 1초를 기다리는 동안 먼저 'End Read File'이 출력되고 그러고 나서 test.txt의 내용이 출력된 것이다.
