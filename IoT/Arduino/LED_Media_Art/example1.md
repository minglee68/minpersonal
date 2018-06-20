Example1 - 불을 동시에 점멸
==========================
9개의 LED를 연결시킨 뒤 모두 동시에 켰다가 동시에 끄는 연습.  
D0부터 D8까지 다 한번에 켠 다음 1000msec delay를 준다.  
그런 다음에 다시 다 한번에 끈 다음 다시 1000msec delay를 준다.  
이것을 무한 반복한다.


~~~
// 연결한 9개의 전구의 GPIO를 array에 넣는다
int D[9] = {D0, D1, D2, D3, D4, D5, D6, D7, D8};


// D0~8까지 모든 핀을 출력으로 설정한다
void setup() {
	for (int i=0; i<9; i++){
		pinMode(D[i], OUTPUT);
	}
}


// 불을 키는 함수
void on(int port) {
	digitalWrite(port, HIGH);
}


// 불을 끄는 함수
void off(int port) {
	digitalWrite(port, LOW);
}


//다 켜지고 1000msec 기다린뒤 다 꺼지고 1000msec 기다리는 무한루프
void loop() {
	for(int i=0; i<9; i++){
		on(D[i]);
	}
	delay(1000);

	for(int i=0; i<9; i++){
		off(D[i]);
	}
	delay(1000);
}
~~~
