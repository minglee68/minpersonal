기본적인 Arduino GPIO 함수들
===========================


### pinMode(pin, mode) ###

* 해당 핀이 어떤 역할을 하는지 지정해주는 함수이다.
* `setup()`함수 안에서 많이 쓰인다.
* `pin`은 `int type`으로, 내가 지정하는 pin의 번호이다. 얘를 들자면 `GPIO12`를 사용한다면 `12`가 들어간다.
	* NodeMCU에서는 쓰기 편하게 `D0, D1, ..., D8`로 지정이 되어있다. 하지만 각각의 GPIO 핀 번호는 다르기때문에 숫자만 적으면 안 된다. Arduino Sketcher에서는 `D0, D1, ..., D8`을 각각의 GPIO 핀 번호로 define이 되어있기 때문에 그대로 사용해도 된다.
~~~
pinMode(D2, OUTPUT);
~~~
* mode는 `INPUT, OUTPUT, INPUT_PULLUP`의 세 가지가 있다. 말 그대로 핀의 역할을 정해주는 것이다. 


### digitalRead(pin) ###

* 지정된 디지털 핀에서 값을 읽어 낸다. (HIGH or LOW)
* `pin`은 `pinMode()`의 `pin`과 같이 내가 지정하는 pin의 번호이다.


### digitalWrite(pin, value) ###

* 지정된 디지털 핀으로 값을 보낸다. (HIGH or LOW)
* `pin`은 `pinMode()`의 `pin`과 같이 내가 지정하는 pin의 번호이다.
* value는 보내는 값으로, HIGH 또는 LOW가 들어간다.
* `pinMode()`로 해당 pin을 `OUTPUT`으로 지정하면 `HIGH`(5V 또는 3.3V)이나 `LOW`(0V 또는 GND)를 보낸다.


Read Serial Port
----------------

* Serial이란 Arduino가 컴퓨터나 다른 디바이스들과 소통할 수 있는 방법 중 하나이다.
* 모든 Arduino Board에는 적어도 하나의 Serial Port가 있고, 컴퓨터에서 Serial Monitor를 사용해서 Arduino가 해당 Serial Port로 출력하는 것을 볼 수 있다.


### Serial.begin(speed) ###

* Data Rate를 `speed`로 지정해주는 것이다.
* 여기서 지정하는 Data Rate와 Serial Monitor에서 볼 때 사용하는 Data Rate가 같아야지 제대로 출력이 된다.


### Serial.available() ###

* 해당 Serial Port에서 읽을 수 있는 데이터의 양(bytes)을 돌려준다.


### Serial.readBytesUntil(character, buffer, length) ###

* Serial Buffer에서 데이터를 읽어서 Array안에 넣는 것이다. 
* `character`는 `char type`의 데이터로, 함수가 Serial Buffer에서 이것과 같은 character를 읽어내면 읽는 걸 그만둔다.
* `buffer`는 `char type`의 `array` 데이터로, 함수가 Serial Buffer에서 읽어낸 것을 저장하는 곳이다.
* `length`는 `int type`의 데이터로, 함수가 이 길이만큼만 읽어 들인다.
* 읽어들인 데이터의 길이를 `size\_t type`으로 반환한다.


### Serial.print(val), Serial.println(val) ###

* `val`의 내용을 Serial Monitor에 출력하는 것이다.
* `Serial.print()`는 개행을 안 하고, `Serial.println()`은 개행을 한다.


### Example Codes ###

~~~
#define LED_BUILTIN D2;		//LED_BUILTIN defined as D2

// setup() 함수는 시작했을 때나 Reset버튼이 눌렸을 때 처음 한번만 실행되는 함수이다.
void setup() {		//pinMode() 함수는 꼭 setup() 함수 안에 있어야 한다. 
	pinMode(LED_BUILTIN, OUTPUT);	//D2는 OUTPUT(출력)이다
}

void loop() {		//Loop with delay
	digitalWrite(LED_BUILTIN, HIGH);    //Turn the light on
	delay(1000);
	digitalWrite(LED_BUILTIN, LOW);     //Turn the light off
	delay(1000);   //Delay for 1000msec
}
~~~
~~~
int pushButton = D2;		//Button defined as D2

void setup() {
	Serial.begin(115200);		//Data rate will be 115200
	pinMode(pushButton, INPUT);	//D2는INPUT(입력)이다
}

void loop() {
	int buttonState = digitalRead(pushButton);	//Button이 눌렸는지 눌리지 않았는지 입력받는다
	Serial.println(buttonState);			//Button의 상태를 Serial Monitor에 출력한다
}
~~~
~~~
void setup() {
	Serial.begin(115200);		//Data rate will be 115200
}

void loop() {
	while(Serial.available() > 0) {		//Serial Buffer에 읽을 수 있는 characters가 있는 동안 반복한다
		char buf[50];		//Serial Buffer에 있는 characters를 받는 변수
		Serial.readBytesUntil('\n', buf, 50);	//'\n'을 읽거나 길이가 50이 될 때까지 읽어들인다
		Serial.print("got: ");
		Serial.println(buf);		//결과는  "got: (buf의 내용)"
	}
}
~~~
