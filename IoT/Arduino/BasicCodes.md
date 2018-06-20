기본적인 Arduino GPIO 함수들
===========================


### pinMode(pin, mode) ###

* 해당 핀이 어떤 역할을 하는지 지정해주는 함수이다.
* setup()함수 안에서 많이 쓰인다.
* pin은 int type으로, 내가 지정하는 pin의 번호이다. 얘를 들자면 GPIO12를 사용한다면 12가 들어간다.
	* NodeMCU에서는 쓰기 편하게 D0, D1, ..., D8로 지정이 되어있다. 하지만 각각의 GPIO 핀 번호는 다르기때문에 숫자만 적으면 안 된다. Arduino Sketcher에서는 D0, D1, ..., D8을 각각의 GPIO 핀 번호로 define이 되어있기 때문에 그대로 사용해도 된다.
	* ex) pin(D2, OUTPUT);
* mode는 INPUT, OUTPUT, INPUT\_PULLUP의 세 가지가 있다. 말 그대로 핀의 역할을 정해주는 것이다. 


### digitalRead(pin) ###

* 지정된 디지털 핀에서 값을 읽어 낸다. (HIGH or LOW)
* pin은 pinMode()의 pin과 같이 내가 지정하는 pin의 번호이다.


### digitalWrite(pin, value) ###

* 지정된 디지털 핀으로 값을 보낸다. (HIGH or LOW)
* pin은 pinMode()의 pin과 같이 내가 지정하는 pin의 번호이다.
* value는 보내는 값, HIGH 또는 LOW가 들어간다.
* pinMode()로 해당 pin을 OUTPUT으로 지정하면 HIGH(5V 또는 3.3V)이나 LOW(0V 또는 GND)를 보낸다.


Read Serial Port
----------------

* Serial이란 Arduino가 컴퓨터나 다른 디바이스들과 소통할 수 있는 방법 중 하나이다.
* 모든 Arduino Board에는 적어도 하나의 Serial Port가 있고, 컴퓨터에서 Serial Monitor를 사용해서 Arduino가 해당 Serial Port로 출력하는 것을 볼 수 있다.


### Serial.begin(speed) ###

* Data Rate를 speed로 지정해주는 것이다.
* 여기서 지정하는 Rate와 Serial Monitor에서 볼 때 사용하는 Data Rate가 같아야지 제대로 출력이 된다.


### Serial.available() ###

* 해당 Serial Port에서 읽을 수 있는 데이터의 양(bytes)을 돌려준다.


### Serial.readBytesUntil(character, buffer, length) ###

* Serial Buffer에서 데이터를 읽어서 Array안에 넣는 것이다. 
* character는 char type의 데이터로, 함수가 Serial Buffer에서 이것과 같은 character를 읽어내면 읽는 걸 그만둔다.
* buffer는 char type의 array 데이터로, 함수가 Serial Buffer에서 읽어낸 것을 저장하는 곳이다.
* length는 int type의 데이터로, 함수가 이 길이만큼만 읽어 들인다.
* 읽어들인 데이터의 길이를 size\_t type으로 반환한다.


### Serial.print(val), Serial.println(val) ###

* val의 내용을 Serial Monitor에 출력하는 것이다.
* Serial.print()는 개행을 안 하고, Serial.println()은 개행을 한다.
