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

* 이 파일은 express application object를 만들고, 여러 setting과 middleware를 여기서 만들어 놓고 모듈로 export한다. 이것을 통해서 /bin/www가 app모듈을 사용하는 것이다.

~~~
var express = require('express');
var app = express();
...
module.exports = app;
~~~

이제부터 우리가 쓰는 app.js에 대한 구체적인 설명을 해본다.

1. 먼저 우리에게 필요한 Module들을 받는다. 여기에선 `express`, `path`, `morgan`, `cookie-parser`, 그리고 `http-errors`를 사용할 것이다. 그리고 사용하게 될 Router들을 'routes' directory에서 불러낸다(`require`). 
  
~~~
// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
~~~
* 여기에선 Module들을 **import**했지만, 아직 실제로 Route들을 사용하진 않았다.  
  
2. 이제 위에서 import한 `express` module로 `app` object를 만들면서, 이것으로 **view(template) engine**을 사용할 수 있도록 설정한다. 설정하는 줄은 두 줄인데, 하나는 `views`값에 우리가 사용할 template들이 저장되어 있는 directory를 지정해주고, `view engine`값으로 사용할 view engine의 template library를 지정해준다. (이번 예제의 경우에는 `pug`를 사용할 것이다)  
  
~~~
// app.js
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
~~~
  
3. 다음으로는 `app.use` 함수를 사용해서 **middleware** Library들을 **request handling chain**, 즉 HTTP에서 받아오는 Request를 다루는 과정에 넣어 놓는다. 그리고 `/public`에 있는 모든 static 파일들을 사용하기 위해서 `express.static`을 사용한다.   
  
~~~
// app.js
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
~~~
  
4. 이제 모든 middleware들이 준비됬기 때문에, 사전에 `require`로 import해놓은 Router들을 사용할 수 있도록 특정 Route에 더해놓는다.   
  
~~~
// app.js
app.use('/', indexRouter);
app.use('/users', usersRouter);
~~~
* 위와 같은 경우에 만약에 `userRouter`에 있는 `/profile` Route를 사용하려면 `/users/profile`로 접속해야 한다. 이런 것처럼 각 module을 위한 Route들을 사전에 지정해 놓는 것이다.   
  
5. 마지막으로 HTTP 404나 다른 Error들을 다루기 위한 middleware를 만들어 놓는다.  
  
~~~
// app.js
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
~~~
  
6. 이제 `app` object의 설정이 끝났기 때문에, **module exports**에 넣어서 외부에서 사용할 수 있도록 한다. (이번의 경우 /bin/www에서 사용하기 위한 작업이다)  
  
~~~
// app.js
module.exports = app;
~~~
  


### Routes
이제 우리가 사용할 Route들이 들어있는 Route 파일들을 살펴보자. 우리가 사용할 Route파일들은 routes/안에 있는데, `index.js`나 `users.js`나 형식은 비슷하기 때문에 이번엔 `users.js`만 설명하겠다.  
  
제일 먼저 `express` Module을 import하고, 이것을 이용해서 `express.Router` object를 만든다. 그리고 이 object에 대한 Route들을 만들고, 이 object를 `module.exports`로 export하는 것이다. 여기에선 `router.get`을 사용하기 때문에 이 Route를 사용하기 위해선 HTTP GET request로  이 Route를 받아야 한다.   
  
~~~
// users.js
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
~~~
* 이 Route를 사용하려면 사용자는 `/users/`를 사용하면 접속할 수 있다.  
* 위의 코드의 callback 함수를 봐보면 `next`라는 argument를 받는 것을 확인할 수 있다. 이것은 지금과 같은 단순한 route callback 함수보다는 middleware 함수에서 많이 사용되지만, 나중에 `/`route path말고도 다른 route들을 더할 때에 유용해진다.   
  
  

### Views(templates)
  
View(template)들은 views directory 안에 저장되어 있고, **.pug**라는 확장자가 붙어있다. 'index.js'에서는 'index.pug'의 **index**라는 template를 사용하기 위해서 `res.render()` method를 사용한다. 이 method는 첫번째 argument로 받은 이름을 갖는 template를 찾아서 그 뒤에 받은 모든 변수와 그 값들을 사용해서 Rendering을 하는 method이다. 아래의 예제에서는 우리의 'index.js'에서 `res.render()`를 사용하고 있는 예제이다.   
  
~~~
// index.js
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
~~~
* 여기에서는 첫번째 argument로 `index`를 줘서 'index.pug'라는 template를 찾고, 그리고 뒤에 object로 `title`이라는 variable을 보낸다. 그리고 아래의 'index.pug'에서는 받은 `title`을 사용해서 출력한다.  
  
~~~
// index.pug
extends layout

block content
  h1= title
  p Welcome to #{title}
~~~


Database를 활용해보기
---------------------
먼저 실제로 사용해보기 전에 우리가 사용하게 될 Database라는게 뭔지 알고 가자. 예를 들어보면, 도서관에서 일하는 사람들은 Local Library Website를 사용해서 책이나 빌려간 사람에 대한 정보들을 저장해 놓는다. 도서관에 온 사람들은 이 사이트로 책을 찾거나 빌리고, 원하는 책을 빌릴 수 있는지도 알아 볼 수 있다. 이런 정보들을 효율적으로 저장하고 사용할 수 있게 하는 것이 Database이다.  
  
Express는 다양한 Database들을 사용할 수 있고, 그 Database들을 위한 **C**reate, **R**ead, **U**pdate, **D**elete (CRUD) 방법들 또한 다양하다. 여기에서는 MongoDB를 사용할 것이다. Database를 사용하는 방법은 크게 2가지로 나뉘는데, 하나는 Database의 Native Query Language(SQL같은 것)을 사용하는 방법이고, 다른 하나는 Object Data Model/Object Relational Model을 사용하는 것이다. ODM/ORM은 Website의 정보를 JavaScript Object로 다루면서 Database에 저장하는 방식이다. 가장 성능이 좋은 것은 Native Query Language를 사용하는 것이다. ODM/ORM은 한번 다른 언어로 거쳤다가 가기 때문에 당연한 결과이다. 하지만 대부분의 프로그래머들은 Native Query Language에 익숙하지 않기 때문에 새로 배울 것이 아니라면 JavaScript형식을 사용하는 ODM/ORM이 더 좋다.  
  
NPM package manager에서 제공하는 ODM/ORM에는 여러가지가 있다.   
* **Mongoose** : MongoDB를 위한 object modeling tool.
* **Waterline** : Redis, MySQL, LDAP, MongoDB, Postgres등의 Database를 위해서 사용할 수 있는 ORM.
* **Bookshelf** : Callback 인터페이스 뿐만이 아니라 다양한 Relation들도 다룰 수 있는 PostgreSQL, MySQL, SQLite3를 위한 것.  
  
위의 예시들 외에도 많이 있다. 여기에서 우린 MongoDB를 위한 ORM/ODM인 Mongoose를 사용할 것이다.  

### Designing Local Library Model
실제로 Database를 만들어보기 전에, 먼저 우리가 저장해야할 Data들과 서로의 relationship을 알아보자. 먼저 책에 대한 정보(제목, 요약, 작가, 장르, ISBN)은 필요하고, 같은 책이 몇 권 있을 수도 있지만 이 책들은 서로 다른 id를 가지고 있어야 한다. 같은 이름을 가진 작가들이 있을 수도 있기 때문에 작가의 이름 뿐만이 아니라 작가에 대한 다른 정보들도 필요할 수 있다. 그리고 이 정보들을 책의 이름, 작가, 장르, 카테고리에 따라서 정리할 수 있어야 한다.   
  
어떤 Model을 디자인 할 때에 **object**별로 다른 Model이 있는 것이 좋다. 이번의 경우 무조건 사용하게 될 object들은 책자체의 정보들, 책의 도서관적인 정보들, 그리고 작가들이다. 그리고 option을 고르기위한 Model도 있는 것이 좋다. 이런 것은 주로 option이 어떻게 바뀔지 모르는, 예를 들자면 장르와 같은 것이 들어간다.   
  
우리가 사용하게 될 Model들과 Field들이 정해지면, 이제 서로의 Relationship을 생각해보면 된다. 아래의 UML Association Diagram은 이번의 경우 사용하게 될 케이스를 보여준다. 위에서 설명했듯이, 우리는 책을 위한 Model(Book : 책 자체에 대한 정보), 책의 도서관적인 Model(BookInstance : 구체적인 한권의 책에 대한 정보), 그리고 작가의 Model이 있다. 그리고 장르에 대한 Model도 더해서 동적으로 적용할 수 있도록 만들었다. 여기에서 `BookInstance`의 `status` field에 대해서는 Model을 지정하지 않았다. `status`는 대여됬는지 안 됬는지라는 지정된 값 외에는 바뀌지 않기 때문에 값을 입력할 때에 직접 넣을 것이다. 각 Box안에는 Model의 이름, Field의 이름과 Type, 그리고 사용될 Method와 return Type가 들어가있다.   
  
그 외에도 이 Diagram은 Model간의 Relationship과 Multiplicities를 알려준다. Multiplicity는 Relationship이 있는 Model들이 서로에게 필요한 minimum/maximum Model의 수를 표현한다. 예를 들자면 `Book` Model과 `Genre` Model이 서로 선으로 이어져있기 때문에 Relationship이 있다는 것을 알 수 있다. 그리고 `Book` Model에 가까운 숫자를 봐보면 `0..*`이라고 나오는데, 이것은 `Genre` 하나는 `Book`을 0개 또는 그 이상을 가지고 있어야 한다는 것이다. `1..*`은 1개 또는 그 이상, `0..1`은 0개 또는 1개, 그리고 `1`은 1개는 꼭 있어야 한다는 것이다.  
  

### Mongoose Primer
우리는 이번 예제에서 Mongoose를 사용할 것이다. Mongoose는 MongoDB Module보다 Higher Level한 Module로, Schema가 꼭 필요한 Module이다. Mongoose로 MongoDB에 접속하기 위해선 아래와 같은 형식으로 접속하면 된다.  
  
~~~
// Mongoose를 import하기
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
~~~

### Model을 만드는 방법
Model은 `Schema` interface로 선언된다. Schema는 각 document마다 가지고 있는 field들의 default 값이나 필요한 validation requirements를 만들 수 있고, 다른 추가적인 기능들도 지정할 수 있다. 이렇게 해서 선언된 schema는 `mongoose.model()` method로 컴파일되서 사용할 수 있게 된다. Schema를 선언하는 방법은 아래와 같다.  
  
~~~
// Require Mongoose
var mongoose = require('mongoose');

// Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
	 a_string: String,
	 a_date: Date
});
~~~
먼저 `mongoose`를 `require()`하고, Schema constructor를 사용해서 새로운 Schema를 만든다. 이렇게 해서 만든 Schema로 아래와 같이 Model을 만들 수 있다.  
  
~~~
// Define Schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);
~~~
`mongoose.model()`의 첫번째 argument는 이 Model을 사용하게 될 Collection을 지정한 것이고(없으면 만든다), 두번째는 Model을 만드는 데에 사용할 Schema를 지정한 것이다. 아래는 Schema에서 사용할 수 있는 Field-Type의 리스트이다.   
  
~~~
// Schema Types(fields)
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
~~~
updated에서는 default값을 지정하고 있고, age에서는 built-in validator(max/min값)와 이 field가 required인지 아닌지를 판단하는 것, 그리고 nested에서는 받은 string에서 모든 공백을 없애고 모두 소문자로 자동으로 변환되는 것을 지정한다. 다른 Type들을 모르겠다면 아래의 링크로 가서 확인해 보는 것이 좋다.  
http://mongoosejs.com/docs/schematypes.html  
  
### Validator
Mongoose에는 여러 Validator들이 있는데, 모든 SchemaType에서 `required` validator는 사용할 수 있지만, 다른 특정 type만을 위한 validator들도 존재한다. Numbers type에는 max/min validator가 있고, Strings type에는 enum(어떤 특정 값들만 인정하는 것), match(주어진 Regular Expression과 일치해야지 맞는 것), max/minlength(최소/최대길이) validator가 있다. 각각 아래와 같이 사용한다.   
  
~~~
var breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
    required: [true, 'Why no eggs?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea', 'Water',]
  }
});
~~~
더 많은 정보들은 아래의 사이트에서 확인해보자.  
http://mongoosejs.com/docs/validation.html   
  
### Virtual Properties
Virtual Property란 Document가 get하거나 set할 수 있는 property이지만 그것이 영구적으로 MongoDB에는 저장되지 않는 property이다. 우리는 나중에 각 model record를 위한 unique URL을 위해서 Virtual Property를 사용할 것이다.  
  
### Method와 Query Helper










