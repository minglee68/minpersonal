Example2 - NodeMCU와 DS18B20을 이용해서 받은 온도를 ThingSpeak에 보내서 그래프를 출력해보는 연습
================================================================================================

시작하기 전에 먼저 해야 할 것:
* ThingSpeak에 가입해서 새로운 채널을 만들어 놓는다.
* 해당 채널의 API Key를 알아 놓는다

여기에선 Http Protocol을 이용해서 정보를 ThingSpeak에 보낸뒤 그 정보가 그래프에 출력되는 것을 확인하는 연습이다.

~~~

const char* host = "api.thingspeak.com"; // "https://"다음, 그리고 다음 '/'가 오기 전까지의 내용이다.
String url = "/update?api_key=your_api_key";
const int httpPort = 80; 		// Default Port Number
int interval = 60000;
float temp = 0;

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS D2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

const char* ssid = "your_ssid";		//WiFi의 이름
const char* password = "your_password";	//WiFi의 비밀번호

String working() {
	// 온도값 받아서 HTTP Parameter형식으로 반환하기
	sensors.requestTemperatures();
	temp = sensors.getTempCByIndex(0);

	return(String("field1=")+String(temp));
}


void delivering(String payload) {
	// ThingSpeak에 연결해서 온도값 보내기
	
	WiFiClient client;
	Serial.print("connecting to ");
	Serial.println(host);

	// 연결에 실패하면 Serial Monitor에 실패했다고 출력한다
	if (!client.connect(host, httpPort)) {
		Serial.print("connection failed: ");
		Serial.println(payload);
		return;
	}
	
	String getheader = "GET "+ String(url) + "&" + String(payload) + " HTTP/1.1";
	client.println(getheader);
	client.println("Host: " + String(host));
	client.println("Connection: close");
	client.println();

	Serial.println(getheader);
	// Serial Monitor에 ThingSpeak로 보내는 동안 이루어지는 절차들을 보여준다
	while (client.connected()) {
		String line = client.readStringUntil('\n');
		Serial.println(line);
	}
	Serial.println("Done cycle.");
}

void connect_ap() {
	// WiFi에 연결하기

	Serial.println();
	Serial.print("connecting to ");
	Serial.println(ssid);
	WiFi.begin(ssid, password);
	int count = 0;
	
	// WiFi에 연결하는 동안 "."으로 로딩화면 보여주기.
	// "."이 20번 나올동안 연결이 안 되면 포기.
	while (WiFi.status() != WL_CONNECTED) {
		delay(500);
		Serial.print(".");
		count++;
		if (count == 20){
			Serial.print("Cannot connect to ");
			Serial.println(ssid);
			return;
		}
	}
	Serial.print("\n Got WiFi, IP address: ");
	Serial.println(WiFi.localIP());
}

void setup() {
	Serial.begin(115200);
	connect_ap();
}

unsigned long mark = 0;
void loop() {
	if (millis() > mark) {
		mark = millis() + interval;
		String payload = working();
		delivering(payload);
	}
}
