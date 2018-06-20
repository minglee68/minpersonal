Things you should know first
============================

### GPIO란? ###

GPIO는 General Purpose Input/Output의 약자이다.

* 입력으로서 동작할 경우 전자회로 외의 부분에서 디지털신호를 받아온다.
* 출력으로서 동작할 경우 다른 디바이스의 제어나 신호를 보내주는 역할을 한다.
* 할 수 있는 일들:
	1. GPIO 핀은 입력/출력 둘 다 될 수 있다.
	2. GPIO 핀은 enabled/disabled 될 수 있다.
	3. 입력으로 받아진 값들은 읽을 수 있다. (주로 High = 1, Low = 0)
	4. 출력하는 값들은 읽을 수도 있고 쓸 수도 있다.
	5. 입력된 값들은 대부분 IRQs로 사용될 수 있다.

### NodeMCU로 LED를 사용한다고 할 때: ###


1. NodeMCU의 GPIO와 LED의 '+'부분을 BreadBoard를 통해서 연결한다.
2. LED의 '-'부분을 BreadBoard의 Bus부분의 '+'부분에 연결한다.
3. 다른 선으로 Bus부분의 '+'부분과 GND(그라운드)와 연결한다.
