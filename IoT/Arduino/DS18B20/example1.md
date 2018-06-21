Example1 - NodeMCU의 D2핀을 사용해서 DS18B20을 통해서 온도를 받는 연습
======================================================================

DS18B20은 One Wire Bus이기 때문에 OneWire.h가 필요하고, Dallas Temperature Sensor이기 때문에 DallasTemperature.h가 필요하다.  

~~~
#include <OneWire.h>
#include <DalllasTemperature.h>

#define ONE_WIRE_BUS D2

// One Wire 디바이스를 사용하기 위한 oneWire클래스를 만든다.
OneWire oneWire(ONE_WIRE_BUS);

// oneWire를 Dallas Temperature에 준다
DallasTemperature sensors(&oneWire);

void setup() {
	Serial.begin(115200); // Data Rate가 115200이 된다
	Serial.println("Dallas Temperature IC Control Library Demo");
	sensors.begin(); // 센서 작동을 시작한다.
}

void loop() {
	Serial.print(" Requesting temperatures...");
	sensors.requestTemperatures();		//온도를 받으라는 명령을 보낸다
	Serial.println("DONE");

	Serial.print("Temperature is: ");
	Serial.print(sensors.getTempCByIndex(0));
	// 한 버스에 DS18B20이 여러 개 연결되어 있을 수도 있기 때문에 첫번째 것만 받는다.
	delay(1000);
}
~~~
