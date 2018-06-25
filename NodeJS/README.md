Node.js 시작하기
=================

본래 과거의 Client Server Architecture는 Multi-Threaded Model을 따랐다.  
Client Server Architecture이란 Client가 Server에 HTTP Request를 보내면 그에 따른 행동을 서버가 데이터베이스를 활용하면서 하고 Response를 돌려보내는 방식이다.   
과거의 Multi-Threaded Model이란 Client가 Server에 HTTP Request를 보내면 서버에서 그에 따른 Thread를 만들어서 그 Thread가 Request에 따른 행동을 하는 것이다. 여기의 단점은 Request를 받으면 받을 수록 Thread가 쌓인다는 점인데, 만일 어떤 Shared Resources를 다수의 Thread가 사용하려고 하면 Shared Resources는 한번에 하나의 Thread만 받기 때문에 다른 Thread들은 차례대로 기다려야 된다는 단점이 있다.  
이 단점을 극복한 것이 Node.js이다. Node.js의 특징은 아래와 같다:
* Node.js는 서버측을 위한 오픈소스 런타임 환경이다.
* Single Thread 이다.
* Google JavaScript V8 Engine을 사용한다.
* Cross Platform으로 윈도우, 맥, 리눅스 등 다수의 OS상에서 사용 가능하다.
* HTTP Request가 주어지면 그 Request에 따라서 Event가 만들어지고, Event가 만들어짐에 따라서 자동으로 Event-Loop가 시작되며, callback을 할 필요가 없어지면 Event-Loop를 끝낸다.
* 다수의 Request가 들어오면 각각의 Event를 만들어서 Event Queue안에 넣어 놓고, Event-Loop라는 Single Thread안에 동시에 넣어서 동시에 작동이 되게 하고, 각각의 callback에 따라서 Request를 보낸 Client로 Response가 된다.

