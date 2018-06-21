Node.js/Express 연습 1
=======================

1. RPi에서 아래와 같은 코드로 nodeEx1.js를 만든다.
2. `$ node nodeEx1.js`를 통해서 실행시킨다.
3. 주소창에 `192.168.x.x:3000/`이라고 적어서 실행시켜 본다. 여기서 *:3000*전의 IP주소는 RPi의 IP주소로 써야한다.

~~~
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
~~~
