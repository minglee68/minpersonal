Arduino
=======

Arduino란?
----------

Arduino는 AVR 마이크로 컴퓨터라 불리는 작은 기반이다.  
C++와 비슷하지만 더 간단한 언어로 프로그래밍을 할 수 있기 때문에 컴퓨터를 잘 모르는 사람이여도 간단하게 하드웨어를 다룰수 있다.  
하지만 여기에선 Arduino Hardware를 사용하는 것이 아니라, Arduino Software를 사용할 것이다.  


Arduino Sketcher란?
-------------------

Arduino Sketcher는 Arduino에서 사용하는 Software로, 여러 종류의 CPU나 보드를 지원하는 Cross Development Tool이다.  
이 소프트웨어를 만든 사람들은 디지털미디어아트를 한 사람들이기 때문에 매우 쓰기 편안하기 인터페이스의 끝판왕이다.  


ATMEGA328P based Arduino UNO Board
----------------------------------

Arduino Hardware의 가장 일반적인 기반으로, ATMEGA328P를 CPU로 사용하고 있다.  
ATMEGA328P는 8 bit one chip computer로, 칩 안에 컴퓨터의 부품이 다 들어가 있고 표면적으로는 입력/출력 핀만 보인다.  
One chip computer란 실질적으론 기반이 따로 필요 없고, 전기를 넣으면 바로 작동되는 것을 얘기한다.  
여기서 Arduino UNO Board는 다른 장치와 ATMEGA328P를 연결해주는 역할을 하는 것이다.  


NodeMCU란?
----------
포괄적으로 말하자면 NodeMCU는 ESP8266의 펌웨어(Firmware)이다.  
먼저 ESP8266이란 IoT를 위해 인터넷에 연결할 수 있는 값싼 WiFi 모듈 칩이다.   
원래는 FTDI칩이라는 미국산 칩이 있는데, 이것은 Windows와 호환이 매우 잘 되지만 그만큼 비싸다.  
그래서 그런 것 보다 더 싸게나오는 ESP8266 WiFi 모듈 칩을 사용하게 하고, 이것을 다른 외부 기기와 연결하기 위한 USB to UART Bridge 칩인 CH340이나 CP2102같은 중국산 하드웨어 호환부품들을 연결시킨 것이 NodeMCU이다.   
중국산을 사용하기 때문에 매우 싸지만, 이런 호환부품들은 Windows의 기본 탑재 드라이버들과 호환되지 않기 때문에 각자의 디바이스드라이버를 직접 설치해야한다.  


Typical Arduoino Programming Process
------------------------------------

새롭게 Arduino Programming을 시작하거나 새로운 라이브러리를 접했을 때 제일 먼저 해야하는 것은 라이브러리에 따라오는 Example Code를 해봐서 어떤 라이브러리인지를 이해해야 한다.  
Arduino나 Raspberry Pi같은 하드웨어들은 버전호환성이 매우 중요하므로 자기만의 코드를 만들기 전에 꼭 먼저 테스트를 돌려보는 것이 좋다.  
Arduino Sketcher는 C/C++와 비슷하지만 가장 큰 다른점은 main()함수가 없다는 것이다. 여기에선 main()함수는 숨겨놓은 채 다른 함수들을 만들게 하고 그것을 loop()함수 안에서 돌게 한다.  
