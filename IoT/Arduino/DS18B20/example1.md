~~~
#include <OneWire.h>
#include <DalllasTemperature.h>

#define ONE_WIRE_BUS D2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
	Serial.begin(115200);
	Serial.println("Dallas Temperature IC Control Library Demo");
	sensors.begin();
}

void loop() {
	Serial.print(" Requesting temperatures...");
	sensors.requestTemperatures();
	Serial.println("DONE");

	Serial.print("Temperature is: ");
	Serial.print(sensors.getTempCByIndex(0));
	delay(1000);
}
~~~
