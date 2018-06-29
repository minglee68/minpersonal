Local Library Website 만들어보기
================================
이것은 `https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs`를 따라하면서 이해한 것을 적어놓을 것이다.

Skeleton Website를 만들어보기
-----------------------------
1. `npm install express-generator -g`로 Express application generator를 설치한다.
2. `express`만 단순히 실행하는 것으로 지금 있는 디렉토리에 Jade view engine과 plain CSS를 사용해서 새로운 프로젝트를 만들 수 있다.
	* `--view` option을 사용해서 특정 view engine을, `--css`를 사용해서 특정 CSS generation engine을 사용할 수 있다.
3. `express express-locallibrary-tutorial --view=pug`를 실행한다.
	* 우리는 **express-locallibrary-tutorial**이라는 이름으로 'pug' view engine을 사용하는 프로젝트를 만들 것이다.
	* css generation engine은 사용하지 않는다.
	* 'pug'는 Jade의 새로운 이름이다.
	* 출력의 마지막 부분에 `npm install`로 설치하라고 나올 것이다. 새로 만들어진 express-locallibrary-tutorial 디렉토리에 들어가서 거기에 있는 package.json을 보면 여러 dependency들이 있는 것을 볼 수 있다. npm install은 그것에 따라서 자동으로 설치한다.
4. `cd express-locallibrary-tutorial`로 들어가서 `npm install`로 설치한다.
5. 그리고나서 아까 3번에서 나온 출력의 마지막 부분의 하나인 `DEBUG=express-locallibrary-tutorial:* npm start`를 그대로 실행한다.
6. 실행이 된 것을 확인하고 브라우저에 `http://localhost:3000/`이라고 쳐본다. 'Welcome to Express'라고 나오면 성공한 것이다.
7. Node가 실행중일 때에 편집을 하면 그것이 바로 적용이 안 되기 때문에 매번마다 다시 실행을 시켜줘야 된다. 이것을 줄이기 위해서 'nodemon'이라는 것을 설치한다.
	1. `npm install --save-dev nodemon`으로 developer를 위한 dependecy 리스트에 저장이 되게 설치를 한다.
		* package.json안의 devDependencies를 봐보면 nodemon이 적혀있는 것을 확인할 수 있다.
	2. 전역으로 설치된 것이 아니기 때문에 command line으로 사용할 수는 없지만 npm script를 통해서 부를 수 있다. 그렇게 하기 위해선 package.json의 scripts부분을 바꿀 필요가 있다. 아래와 같이 바꿔라.


~~~
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
~~~

8. 이제 5번과 거의 비슷하지만 조금 다르게, `DEBUG=express-locallibrary-tutorial:* npm run devstart`를 사용해서 실행시키면 된다.



만들어진 프로젝트를 해석해보기
------------------------------

### 전체 디렉토리 리스트

~~~
/express-locallibrary-tutorial
    app.js
    /bin
        www
    package.json
    /node_modules
        [about 4,500 subdirectories and files]
    /public
        /images
        /javascripts
        /stylesheets
            style.css
    /routes
        index.js
        users.js
    /views
        error.pug
        index.pug
        layout.pug
~~~
* package.json은 여기에서 사용되는 dependency들을 알려주고, startup script로 application을 실행하는 Javascript 파일 '/bin/www'을 지정해준다.
* app.js에서 사용하는 루트 함수들은 /routes디렉토리 안의 루트 모듈들 (index.js, users.js)에 저장되어있다.
* Template는 /views디렉토리 안에 저장되어있다.


### package.json

~~~
{
  "name": "express-locallibrary-tutorial",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.18.2",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.2",
    "morgan": "~1.9.0",
    "pug": "~2.0.0-rc.4",
    "serve-favicon": "~2.4.5"
  },
  "devDependencies": {
    "nodemon": "^1.14.11"
  }
}
~~~
* "body-parser"는 Node.js에서 사용되는 HTTP Request로 주어진 데이터를 해석하는 모듈이다. POST parameter들을 위해서 주로 사용된다. 하지만 지금은 따로 사용하지 않고 express에서 자체적으로 주어지는 'req.body'로 사용된다.
* "cookie-parser"는 Cookie 정보를 사용하는 모듈이다.
* "debug"는 node의 추가적인 debugging 기술이 들어가있는 모듈이다.
* "morgan"은 HTTP Request logger middleware이다.
* "serve-favicon"은 favicon(bookmark icon, URL icon, shortcut icon 등등의 icon)을 사용하기 위한 middleware이다.
* "scripts"안에 있는 "start" script는 `npm start`가 주어졌을 때에 node로 ./bin/www를 실행하는 것이다.
* "scripts"안에 있는 "devstart" script는 `npm run devstart`가 주어졌을 때에 nodemon으로 ./bin/www를 시작하는 것이다.


### www 파일

~~~
#!/usr/bin/env node

/*
 Module dependencies.
 */

var app = require('../app');
...
~~~

* /bin/www파일은 application이 시작되는 지점이다. 이것이 제일 처음에 하는 일은 app.js 루트 모듈을 받는 것이다. 여기선 relative path로 app.js를 부르기 때문에 '.js'의 확장자를 뺐다.
* 나머지 코드는 HTTP 서버를 포트번호 3000으로 열고 서버 연결과 에러를 출력하는 일을 한다.


### app.js

* 이 파일은 express application object를 만들고, 

